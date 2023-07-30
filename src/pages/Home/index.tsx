import {
  Code,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Minimize,
  Save,
} from "@mui/icons-material";
import { Box, IconButton, ToggleButton, Typography } from "@mui/material";
import { marked } from "marked";
import React, { useEffect, useRef, useState } from "react";
import {
  EditorContainer,
  EditorTextArea,
  EditorToolbar,
  MarkdownPreview,
  StyledToggleButtonGroup,
} from "../../components";

const Home: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const undoStackRef = useRef<string[]>([]);
  const currentHistoryIndexRef = useRef<number>(-1);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    setMarkdown(inputValue);

    // Save the current state for undo
    pushToUndoStack(inputValue);
  };

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    format: string
  ) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Save the current state for undo
      // pushToUndoStack(markdown);

      switch (format) {
        case "bold":
          setMarkdown(
            (prevMarkdown) =>
              prevMarkdown.slice(0, start) +
              `**${prevMarkdown.slice(start, end)}**` +
              prevMarkdown.slice(end)
          );
          break;
        case "italic":
          setMarkdown(
            (prevMarkdown) =>
              prevMarkdown.slice(0, start) +
              `*${prevMarkdown.slice(start, end)}*` +
              prevMarkdown.slice(end)
          );
          break;
        case "underline":
          setMarkdown(
            (prevMarkdown) =>
              prevMarkdown.slice(0, start) +
              `<u>${prevMarkdown.slice(start, end)}</u>` +
              prevMarkdown.slice(end)
          );
          break;
        case "code":
          setMarkdown(
            (prevMarkdown) =>
              prevMarkdown.slice(0, start) +
              `\n\`\`\`\n${prevMarkdown.slice(start, end)}\n\`\`\`\n` +
              prevMarkdown.slice(end)
          );
          break;
        case "separator":
          setMarkdown(
            (prevMarkdown) =>
              prevMarkdown.slice(0, start) + "\n---\n" + prevMarkdown.slice(end)
          );
          break;
        default:
          break;
      }

      // Restore cursor position after state update
      textarea.focus();
      textarea.setSelectionRange(start + 1, end + 1);
    }
  };

  const pushToUndoStack = (content: string) => {
    if (currentHistoryIndexRef.current === undoStackRef.current.length - 1) {
      undoStackRef.current.push(content);
    } else {
      undoStackRef.current.splice(currentHistoryIndexRef.current + 1);
      undoStackRef.current.push(content);
    }
    currentHistoryIndexRef.current = undoStackRef.current.length - 1;
  };

  const undo = () => {
    if (currentHistoryIndexRef.current > 0) {
      const prevContent =
        undoStackRef.current[currentHistoryIndexRef.current - 1];
      setMarkdown(prevContent);
      currentHistoryIndexRef.current--;
    }
  };

  const redo = () => {
    if (currentHistoryIndexRef.current < undoStackRef.current.length - 1) {
      const nextContent =
        undoStackRef.current[currentHistoryIndexRef.current + 1];
      setMarkdown(nextContent);
      currentHistoryIndexRef.current++;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && textareaRef.current) {
        const { key } = event;
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const lastValue = textarea.value;

        switch (key.toLowerCase()) {
          case "b":
            // Apply bold to selected text
            setMarkdown(
              (prevMarkdown) =>
                prevMarkdown.slice(0, start) +
                `**${prevMarkdown.slice(start, end)}**` +
                prevMarkdown.slice(end)
            );
            pushToUndoStack(lastValue);
            break;
          case "i":
            // Apply italic to selected text
            setMarkdown(
              (prevMarkdown) =>
                prevMarkdown.slice(0, start) +
                `*${prevMarkdown.slice(start, end)}*` +
                prevMarkdown.slice(end)
            );
            pushToUndoStack(lastValue);
            break;
          case "u":
            // Apply underline to selected text
            setMarkdown(
              (prevMarkdown) =>
                prevMarkdown.slice(0, start) +
                `<u>${prevMarkdown.slice(start, end)}</u>` +
                prevMarkdown.slice(end)
            );
            pushToUndoStack(lastValue);
            break;
          case "z":
            // Ctrl+Z (undo) functionality
            event.preventDefault();
            undo();
            break;
          case "y":
            // Ctrl+Z (redo) functionality
            event.preventDefault();
            redo();
            break;
          default:
            break;
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <EditorContainer>
      <EditorToolbar>
        <Typography variant="h6">Markdown Editor</Typography>
        <Box display="flex" alignItems="center">
          <StyledToggleButtonGroup
            value={[]}
            onChange={handleFormat}
            size="small"
            exclusive
            aria-label="text formatting"
          >
            <ToggleButton value="bold" aria-label="bold">
              <FormatBold />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalic />
            </ToggleButton>
            <ToggleButton value="underline" aria-label="underline">
              <FormatUnderlined />
            </ToggleButton>
            <ToggleButton value="code" aria-label="code">
              <Code />
            </ToggleButton>
            <ToggleButton value="separator" aria-label="separator">
              <Minimize />
            </ToggleButton>
          </StyledToggleButtonGroup>
          <IconButton
            color="primary"
            aria-label="save"
            onClick={() => alert("Save functionality goes here")}
          >
            <Save />
          </IconButton>
        </Box>
      </EditorToolbar>
      <Box display="flex">
        <Box flex="1" p={2}>
          <EditorTextArea
            ref={textareaRef}
            id="editor-textarea"
            value={markdown}
            onChange={handleInputChange}
            placeholder="Write your markdown here..."
          />
        </Box>
        <Box flex="1" p={2}>
          <MarkdownPreview
            dangerouslySetInnerHTML={{ __html: marked(markdown) }}
          />
        </Box>
      </Box>
    </EditorContainer>
  );
};

export default Home;
