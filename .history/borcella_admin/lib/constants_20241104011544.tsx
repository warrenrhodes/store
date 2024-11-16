import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/collections",
    icon: <Shapes />,
    label: "Collections",
  },
  {
    url: "/products",
    icon: <Tag />,
    label: "Products",
  },
  {
    url: "/medias",
    icon: <Tag />,
    label: "Products",
  },
  {
    url: "/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    url: "/customers",
    icon: <UsersRound />,
    label: "Customers",
  },
];

export const FONT_FAMILIES = [
  { name: "Default", value: "Inter" },
  { name: "Arial", value: "Arial" },
  { name: "Georgia", value: "Georgia" },
  { name: "Times New Roman", value: "Times New Roman" },
  { name: "Courier New", value: "Courier New" },
  { name: "Helvetica", value: "Helvetica" },
  { name: "Verdana", value: "Verdana" },
];

export const FONT_SIZES = [
  { name: "Default", value: "normal" },
  { name: "Small", value: "small" },
  { name: "Normal", value: "normal" },
  { name: "Large", value: "large" },
  { name: "Extra Large", value: "x-large" },
  { name: "8px", value: "8px" },
  { name: "10px", value: "10px" },
  { name: "12px", value: "12px" },
  { name: "14px", value: "14px" },
  { name: "16px", value: "16px" },
  { name: "18px", value: "18px" },
  { name: "20px", value: "20px" },
  { name: "24px", value: "24px" },
  { name: "30px", value: "30px" },
  { name: "36px", value: "36px" },
  { name: "48px", value: "48px" },
  { name: "60px", value: "60px" },
  { name: "72px", value: "72px" },
];

export const richText = `
    .ProseMirror h1 {
      font-size: 2.25em;
      font-weight: 700;
      margin-top: 0.67em;
      margin-bottom: 0.67em;
    }
    .ProseMirror h2 {
      font-size: 1.75em;
      font-weight: 600;
      margin-top: 0.83em;
      margin-bottom: 0.83em;
    }
    .ProseMirror h3 {
      font-size: 1.5em;
      font-weight: 600;
      margin-top: 1em;
      margin-bottom: 1em;
    }

    .ProseMirror ul,
    .ProseMirror ol {
      padding-left: 1.5em;
      margin-top: 1em;
      margin-bottom: 1em;
    }

    .ProseMirror ul {
      list-style-type: disc;
    }

    .ProseMirror ul ul {
      list-style-type: circle;
    }

    .ProseMirror ul ul ul {
      list-style-type: square;
    }

    .ProseMirror ol {
      list-style-type: decimal;
    }

    .ProseMirror ol ol {
      list-style-type: lower-alpha;
    }

    .ProseMirror ol ol ol {
      list-style-type: lower-roman;
    }

    .ProseMirror li {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
      line-height: 1.5;
    }

    .ProseMirror li p {
      margin: 0;
    }

    /* Nested list spacing */
    .ProseMirror li > ul,
    .ProseMirror li > ol {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }

    /* List alignment support */
    .ProseMirror ul[data-text-align='center'],
    .ProseMirror ol[data-text-align='center'] {
      padding-left: 0;
      list-style-position: inside;
    }

    .ProseMirror ul[data-text-align='right'],
    .ProseMirror ol[data-text-align='right'] {
      padding-left: 0;
      list-style-position: inside;
    }
    .ProseMirror-custom {
    .font-size-small { font-size: small; }
    .font-size-normal { font-size: medium; }
    .font-size-large { font-size: large; }
    .font-size-xlarge { font-size: x-large; }
  
  [style*="font-family"] {
    font-family: inherit;
    &[style*="Arial"] { font-family: Arial, sans-serif; }
    &[style*="Georgia"] { font-family: Georgia, serif; }
    &[style*="Times New Roman"] { font-family: "Times New Roman", Times, serif; }
    &[style*="Courier New"] { font-family: "Courier New", Courier, monospace; }
    &[style*="Helvetica"] { font-family: Helvetica, Arial, sans-serif; }
    &[style*="Verdana"] { font-family: Verdana, Geneva, sans-serif; }
  }
}
  `;
