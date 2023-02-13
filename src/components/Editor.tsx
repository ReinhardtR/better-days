import { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import {
  Bold,
  ChevronDown,
  Italic,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { createElement, Fragment } from "react";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { ScrollArea } from "./ui/ScrollArea";
import { Separator } from "./ui/Separator";
import { Toggle } from "./ui/Toggle";

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "Hi",
    editorProps: {
      attributes: {
        class:
          "prose prose-slate prose-md dark:prose-invert p-4 focus:outline-none",
      },
    },
  });

  return (
    <div className="flex h-full flex-col">
      <MenuBar editor={editor} />
      <Separator />
      <ScrollArea className="h-full">
        <EditorContent editor={editor} />
      </ScrollArea>
    </div>
  );
}

type EditorType = ReturnType<typeof useEditor>;

type MenuBarProps = {
  editor: EditorType;
};

function MenuBar({ editor }: MenuBarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center p-2">
      <div className="flex items-center">
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <div className="mx-auto flex items-center">
        <TypographyMenu editor={editor} />
      </div>

      <div className="flex items-center space-x-2">
        <Toggle
          aria-label="Toggle bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          aria-label="Toggle italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive("italic")}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          aria-label="Toggle strike"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive("strike")}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  );
}

const TYPOGRAPHY_OPTIONS = {
  p: "Paragraph",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
} as const;

type TypographyOptionElement = keyof typeof TYPOGRAPHY_OPTIONS;
type TypographyOptionName =
  (typeof TYPOGRAPHY_OPTIONS)[TypographyOptionElement];

type TypographyMenuProps = {
  editor: EditorType;
};

function TypographyMenu({ editor }: TypographyMenuProps) {
  if (!editor) {
    return null;
  }

  const options = Object.entries(TYPOGRAPHY_OPTIONS) as [
    TypographyOptionElement,
    TypographyOptionName
  ][];

  const typographySelectionHandler = (
    name: TypographyOptionName,
    element: TypographyOptionElement
  ) => {
    const typographyInfo = TYPOGRAPHY_OPTIONS_EDITOR_MAP[element];

    if (typographyInfo.type === "heading") {
      editor
        .chain()
        .focus()
        .toggleHeading({
          level: typographyInfo.level,
        })
        .run();
    } else if (typographyInfo.type === "paragraph") {
      editor.chain().focus().setParagraph().run();
    }
  };

  let selectedOptionName = "Paragraph";

  const heading = editor.isActive("heading");

  if (heading) {
    const level = editor.getAttributes("heading")?.level;
    selectedOptionName = `Heading ${level}`;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <p>{selectedOptionName}</p>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="py-1"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {options.map(([element, name], index) => (
          <Fragment key={name}>
            <TypographyMenuItem
              element={element}
              name={name}
              onSelect={() => typographySelectionHandler(name, element)}
            />
            {index !== options.length - 1 && <DropdownMenuSeparator />}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface TypographyMenuItemProps extends DropdownMenuItemProps {
  element: TypographyOptionElement;
  name: TypographyOptionName;
}

function TypographyMenuItem({
  element,
  name,
  ...props
}: TypographyMenuItemProps) {
  return (
    <DropdownMenuItem
      className="prose-sm prose-slate h-10 font-sans dark:prose-invert"
      {...props}
    >
      {createElement(
        element,
        {
          className: "m-0 leading-none",
        },
        name
      )}
    </DropdownMenuItem>
  );
}

const TYPOGRAPHY_OPTIONS_EDITOR_MAP = {
  p: {
    type: "paragraph",
  },
  h1: {
    type: "heading",
    level: 1,
  },
  h2: {
    type: "heading",
    level: 2,
  },
  h3: {
    type: "heading",
    level: 3,
  },
  h4: {
    type: "heading",
    level: 4,
  },
  h5: {
    type: "heading",
    level: 5,
  },
  h6: {
    type: "heading",
    level: 6,
  },
} as const;
