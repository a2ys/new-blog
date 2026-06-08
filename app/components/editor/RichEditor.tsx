"use client";

import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { useState, useCallback, useEffect, useRef } from "react";
import { marked } from "marked";
import { CodeBlockComponent } from "./CodeBlockComponent";
import {
  createSlashCommands,
  type SlashCallbacks,
  type SlashCommand,
} from "./SlashCommands";

const lowlight = createLowlight(common);

const _slashBridge: SlashCallbacks = {
  onOpen: () => {},
  onUpdate: () => {},
  onClose: () => {},
  onKeyDown: () => false,
};

function BubbleBtn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      className={[
        "px-2.5 py-1.5 text-xs font-bold transition-colors",
        active ? "bg-white text-black" : "text-gray-400 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-4 bg-white/20 mx-0.5 shrink-0" />;
}

function FloatingToolbar({
  editor,
  onSetLink,
}: {
  editor: ReturnType<typeof useEditor>;
  onSetLink: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({ display: "none" });

  useEffect(() => {
    if (!editor) return;
    const update = () => {
      if (editor.state.selection.empty) {
        setStyle({ display: "none" });
        return;
      }
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) {
        setStyle({ display: "none" });
        return;
      }
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      if (rect.width === 0) {
        setStyle({ display: "none" });
        return;
      }
      const w = ref.current?.offsetWidth ?? 320;
      const left = Math.max(
        8,
        Math.min(rect.left + rect.width / 2 - w / 2, window.innerWidth - w - 8),
      );
      setStyle({
        display: "flex",
        position: "fixed",
        top: rect.top - 46,
        left,
        zIndex: 50,
      });
    };
    editor.on("selectionUpdate", update);
    editor.on("blur", () => setStyle({ display: "none" }));
    return () => {
      editor.off("selectionUpdate", update);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div
      ref={ref}
      style={style}
      onMouseDown={(e) => e.preventDefault()}
      className="items-center bg-black border border-white/10 shadow-xl overflow-hidden flex-wrap"
    >
      <BubbleBtn
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        title="Bold"
      >
        <strong>B</strong>
      </BubbleBtn>
      <BubbleBtn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        title="Italic"
      >
        <em>I</em>
      </BubbleBtn>
      <BubbleBtn
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
        title="Strikethrough"
      >
        <s>S</s>
      </BubbleBtn>
      <BubbleBtn
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
        title="Inline code"
      >
        {"<>"}
      </BubbleBtn>
      <BubbleBtn
        onClick={onSetLink}
        active={editor.isActive("link")}
        title="Link"
      >
        ↗
      </BubbleBtn>
      <Divider />
      <BubbleBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive("heading", { level: 1 })}
        title="Heading 1"
      >
        H1
      </BubbleBtn>
      <BubbleBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        H2
      </BubbleBtn>
      <BubbleBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
        title="Heading 3"
      >
        H3
      </BubbleBtn>
      <BubbleBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        active={editor.isActive("heading", { level: 4 })}
        title="Heading 4"
      >
        H4
      </BubbleBtn>
      <Divider />
      <BubbleBtn
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
        title="Blockquote"
      >
        &ldquo;
      </BubbleBtn>
      <BubbleBtn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        title="Bullet list"
      >
        •—
      </BubbleBtn>
      <BubbleBtn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
        title="Numbered list"
      >
        1.
      </BubbleBtn>
      <BubbleBtn
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
        title="Code block"
      >
        {"{ }"}
      </BubbleBtn>
    </div>
  );
}

function SlashMenu({
  items,
  rect,
  selectedIndex,
  onSelect,
}: {
  items: SlashCommand[];
  rect: DOMRect | null;
  selectedIndex: number;
  onSelect: (item: SlashCommand) => void;
}) {
  if (!rect) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        zIndex: 50,
      }}
      className="bg-white border-2 border-black shadow-xl w-56 py-1"
    >
      {items.length === 0 ? (
        <p className="px-4 py-3 text-xs text-gray-400">No results</p>
      ) : (
        items.map((item, i) => (
          <button
            key={item.key}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(item);
            }}
            className={[
              "w-full text-left px-4 py-2.5 transition-colors flex flex-col",
              i === selectedIndex ? "bg-gray-50" : "hover:bg-gray-50",
            ].join(" ")}
          >
            <span className="text-sm font-semibold text-black">
              {item.label}
            </span>
            <span className="text-xs text-gray-400">{item.description}</span>
          </button>
        ))
      )}
    </div>
  );
}

interface RichEditorProps {
  initialContent?: string;
  onChange: (html: string) => void;
}

export function RichEditor({ initialContent = "", onChange }: RichEditorProps) {
  const [showImport, setShowImport] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [markdownInput, setMarkdownInput] = useState("");

  const slashItemsRef = useRef<SlashCommand[]>([]);
  const slashSelectedRef = useRef(0);
  const slashExecRef = useRef<((item: SlashCommand) => void) | null>(null);

  const [slashMenu, setSlashMenu] = useState<{
    items: SlashCommand[];
    rect: DOMRect | null;
    selectedIndex: number;
  } | null>(null);

  const [slashExtension] = useState(() =>
    createSlashCommands({
      onOpen: (...args) => _slashBridge.onOpen(...args),
      onUpdate: (...args) => _slashBridge.onUpdate(...args),
      onClose: () => _slashBridge.onClose(),
      onKeyDown: (ev) => _slashBridge.onKeyDown(ev),
    }),
  );

  useEffect(() => {
    _slashBridge.onOpen = (items, rect, exec) => {
      slashSelectedRef.current = 0;
      slashItemsRef.current = items;
      slashExecRef.current = exec;
      setSlashMenu({ items, rect, selectedIndex: 0 });
    };

    _slashBridge.onUpdate = (items, rect) => {
      slashSelectedRef.current = 0;
      slashItemsRef.current = items;
      setSlashMenu((prev) =>
        prev ? { ...prev, items, rect, selectedIndex: 0 } : null,
      );
    };

    _slashBridge.onClose = () => {
      setSlashMenu(null);
      slashExecRef.current = null;
    };

    _slashBridge.onKeyDown = (event) => {
      const items = slashItemsRef.current;
      if (!items.length) return false;

      if (event.key === "ArrowDown") {
        slashSelectedRef.current =
          (slashSelectedRef.current + 1) % items.length;
        setSlashMenu((prev) =>
          prev ? { ...prev, selectedIndex: slashSelectedRef.current } : null,
        );
        return true;
      }
      if (event.key === "ArrowUp") {
        slashSelectedRef.current =
          (slashSelectedRef.current - 1 + items.length) % items.length;
        setSlashMenu((prev) =>
          prev ? { ...prev, selectedIndex: slashSelectedRef.current } : null,
        );
        return true;
      }
      if (event.key === "Enter") {
        const item = items[slashSelectedRef.current];
        if (item && slashExecRef.current) {
          slashExecRef.current(item);
          return true;
        }
      }
      if (event.key === "Escape") {
        setSlashMenu(null);
        return true;
      }
      return false;
    };
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Placeholder.configure({
        placeholder: "Tell your story... (type / for commands)",
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "underline text-blue-600 cursor-pointer" },
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
      slashExtension,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-neutral max-w-none focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("URL", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  function importMarkdown() {
    if (!editor || !markdownInput.trim()) return;
    const html = marked.parse(markdownInput) as string;
    editor.commands.setContent(html, { emitUpdate: true });
    setMarkdownInput("");
    setShowImport(false);
  }

  return (
    <div className="relative">
      {showImport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white border-2 border-black w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-black">
              <h3 className="text-sm font-black uppercase tracking-[0.2em]">
                Import Markdown
              </h3>
              <button
                onClick={() => setShowImport(false)}
                className="text-gray-400 hover:text-black transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <textarea
                value={markdownInput}
                onChange={(e) => setMarkdownInput(e.target.value)}
                placeholder="Paste your markdown here..."
                rows={12}
                autoFocus
                className="w-full px-4 py-3 text-sm font-mono border-2 border-black focus:outline-none focus:ring-2 focus:ring-black resize-none placeholder:text-gray-300"
              />
              <p className="mt-2 text-xs text-gray-400">
                This will replace the current editor content.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t-2 border-black">
              <button
                onClick={() => setShowImport(false)}
                className="rounded-full px-5 py-2 text-sm font-semibold border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={importMarkdown}
                className="rounded-full px-5 py-2 text-sm font-semibold border-2 border-black bg-black text-white hover:bg-transparent hover:text-black transition-all duration-200"
              >
                Import →
              </button>
            </div>
          </div>
        </div>
      )}

      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white border-2 border-black w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-black">
              <h3 className="text-sm font-black uppercase tracking-[0.2em]">
                Markdown shortcuts ✦
              </h3>
              <button
                onClick={() => setShowShortcuts(false)}
                className="text-gray-400 hover:text-black transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-2">
              {[
                ["# ", "Heading 1"],
                ["## ", "Heading 2"],
                ["### ", "Heading 3"],
                ["**text**", "Bold"],
                ["*text*", "Italic"],
                ["~~text~~", "Strikethrough"],
                ["> ", "Blockquote"],
                ["- ", "Bullet list"],
                ["1. ", "Numbered list"],
                ["``` ", "Code block"],
                ["---", "Divider"],
              ].map(([shortcut, label]) => (
                <div
                  key={shortcut}
                  className="flex items-center justify-between gap-4"
                >
                  <code className="text-xs bg-gray-100 px-2 py-1 font-mono text-gray-700">
                    {shortcut}
                  </code>
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t-2 border-black">
              <p className="text-xs text-gray-400">
                Type these directly in the editor — they convert automatically.
              </p>
            </div>
          </div>
        </div>
      )}

      {editor && <FloatingToolbar editor={editor} onSetLink={setLink} />}

      {slashMenu && (
        <SlashMenu
          items={slashMenu.items}
          rect={slashMenu.rect}
          selectedIndex={slashMenu.selectedIndex}
          onSelect={(item) => slashExecRef.current?.(item)}
        />
      )}

      <div className="px-6 lg:px-12 py-8 min-h-[60vh]">
        <EditorContent editor={editor} />
      </div>

      <div className="px-6 lg:px-12 pb-12 flex items-center gap-4">
        <button
          onClick={() => setShowImport(true)}
          className="text-xs text-gray-400 hover:text-black transition-colors font-medium underline underline-offset-2"
        >
          Import from Markdown
        </button>
        <span className="text-gray-200 text-xs">·</span>
        <button
          onClick={() => setShowShortcuts(true)}
          className="text-xs text-gray-400 hover:text-black transition-colors font-medium"
        >
          ✦ shortcuts
        </button>
      </div>
    </div>
  );
}
