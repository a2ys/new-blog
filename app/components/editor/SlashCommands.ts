import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import type {
  SuggestionProps,
  SuggestionKeyDownProps,
} from "@tiptap/suggestion";
import type { Editor } from "@tiptap/core";

export const SLASH_COMMANDS = [
  { label: "Heading 1", description: "Big section header", key: "h1" },
  { label: "Heading 2", description: "Medium section header", key: "h2" },
  { label: "Heading 3", description: "Small section header", key: "h3" },
  { label: "Heading 4", description: "Subtle header", key: "h4" },
  { label: "Bullet List", description: "Unordered list", key: "bullet" },
  { label: "Numbered List", description: "Ordered list", key: "ordered" },
  { label: "Code Block", description: "Syntax highlighted", key: "code" },
  { label: "Blockquote", description: "Indented quote", key: "quote" },
  { label: "Divider", description: "Horizontal rule", key: "hr" },
] as const;

export type SlashCommand = (typeof SLASH_COMMANDS)[number];

export type SlashCallbacks = {
  onOpen: (
    items: SlashCommand[],
    rect: DOMRect | null,
    exec: (item: SlashCommand) => void,
  ) => void;
  onUpdate: (items: SlashCommand[], rect: DOMRect | null) => void;
  onClose: () => void;
  onKeyDown: (event: KeyboardEvent) => boolean;
};

export function runSlashCommand(key: SlashCommand["key"], editor: Editor) {
  switch (key) {
    case "h1":
      editor.chain().focus().toggleHeading({ level: 1 }).run();
      break;
    case "h2":
      editor.chain().focus().toggleHeading({ level: 2 }).run();
      break;
    case "h3":
      editor.chain().focus().toggleHeading({ level: 3 }).run();
      break;
    case "h4":
      editor.chain().focus().toggleHeading({ level: 4 }).run();
      break;
    case "bullet":
      editor.chain().focus().toggleBulletList().run();
      break;
    case "ordered":
      editor.chain().focus().toggleOrderedList().run();
      break;
    case "code":
      editor.chain().focus().toggleCodeBlock().run();
      break;
    case "quote":
      editor.chain().focus().toggleBlockquote().run();
      break;
    case "hr":
      editor.chain().focus().setHorizontalRule().run();
      break;
  }
}

export function createSlashCommands(callbacks: SlashCallbacks) {
  return Extension.create({
    name: "slashCommands",
    addProseMirrorPlugins() {
      return [
        Suggestion<SlashCommand>({
          editor: this.editor,
          char: "/",
          items: ({ query }) =>
            [...SLASH_COMMANDS].filter(
              (cmd) =>
                cmd.label.toLowerCase().includes(query.toLowerCase()) ||
                cmd.description.toLowerCase().includes(query.toLowerCase()),
            ),
          command: ({ editor, range, props }) => {
            editor.chain().focus().deleteRange(range).run();
            runSlashCommand(props.key, editor);
          },
          render: () => ({
            onStart: (props: SuggestionProps<SlashCommand>) =>
              callbacks.onOpen(
                props.items,
                props.clientRect?.() ?? null,
                props.command,
              ),
            onUpdate: (props: SuggestionProps<SlashCommand>) =>
              callbacks.onUpdate(props.items, props.clientRect?.() ?? null),
            onExit: callbacks.onClose,
            onKeyDown: ({ event }: SuggestionKeyDownProps) =>
              callbacks.onKeyDown(event),
          }),
        }),
      ];
    },
  });
}
