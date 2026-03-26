import { c as createLucideIcon, q as jsxRuntimeExports, Q as Slot$1, B as cn, R as cva, j as reactExports, y as useComposedRefs, T as createSlot, X, G as useInternetIdentity, t as motion, K as Button, I as Input, L as Link, P as Plus, U as Trash2, F as ue } from "./index-Csh16hVy.js";
import { P as Portal$1, h as hideOthers, R as ReactRemoveScroll, g as useFocusGuards, F as FocusScope, D as DismissableLayer, S as Select, b as SelectTrigger, d as SelectValue, e as SelectContent, f as SelectItem, C as Checkbox } from "./select-CaGKhhlE.js";
import { u as useControllableState, c as createContextScope, e as useId, g as Presence, P as Primitive, b as composeEventHandlers, h as createContext2 } from "./index-DV4ugF-H.js";
import { T as Textarea } from "./textarea-DV9dnfco.js";
import { c as useIsAdmin, u as useAllProducts, d as useCreateOrUpdateProduct, e as useClaimAdmin } from "./useQueries-vTecb3Wq.js";
import "./check-0k4DKgok.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot$1 : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
var DIALOG_NAME = "Dialog";
var [createDialogContext] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog$1.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal$1 = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay$1.displayName = OVERLAY_NAME;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME = "DialogContent";
var DialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent$1.displayName = CONTENT_NAME;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME = "DialogTitle";
var DialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    var _a;
    const describedById = (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root$1 = Dialog$1;
var Portal = DialogPortal$1;
var Overlay = DialogOverlay$1;
var Content = DialogContent$1;
var Title = DialogTitle$1;
var Close = DialogClose;
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
const CATEGORIES = ["Electronics", "Fashion", "Home", "Sports", "Beauty"];
const emptyForm = () => ({
  title: "",
  category: "Electronics",
  price: 0,
  originalPrice: 0,
  description: "",
  sizes: [],
  stock: 0n,
  colors: [],
  rating: 0,
  reviewCount: 0n,
  isFlashSale: false,
  isTrending: false,
  images: []
});
const productToForm = (p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  price: String(p.price),
  originalPrice: String(p.originalPrice),
  description: p.description,
  sizes: p.sizes.join(", "),
  stock: String(p.stock),
  colors: p.colors.join(", "),
  rating: p.rating,
  reviewCount: p.reviewCount,
  isFlashSale: p.isFlashSale,
  isTrending: p.isTrending,
  images: p.images
});
const formToProduct = (form) => ({
  id: form.id,
  title: form.title,
  category: form.category,
  price: Number.parseFloat(form.price) || 0,
  originalPrice: Number.parseFloat(form.originalPrice) || 0,
  description: form.description,
  sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
  stock: BigInt(Number.parseInt(form.stock) || 0),
  colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
  rating: form.rating,
  reviewCount: form.reviewCount,
  isFlashSale: form.isFlashSale,
  isTrending: form.isTrending,
  images: form.images
});
function ProductFormModal({
  open,
  onClose,
  initial
}) {
  const mutation = useCreateOrUpdateProduct();
  const [form, setForm] = reactExports.useState(
    () => initial ? productToForm(initial) : {
      id: "",
      ...emptyForm(),
      price: "0",
      originalPrice: "0",
      stock: "0",
      sizes: "",
      colors: ""
    }
  );
  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const handleSubmit = async () => {
    if (!form.title.trim()) {
      ue.error("Product title is required");
      return;
    }
    const product = formToProduct({
      ...form,
      id: form.id || crypto.randomUUID()
    });
    try {
      await mutation.mutateAsync(product);
      ue.success(initial ? "Product updated!" : "Product created!");
      onClose();
    } catch {
      ue.error("Failed to save product");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl max-h-[90vh] overflow-y-auto",
      style: {
        background: "rgba(5, 2, 15, 0.97)",
        border: "1px solid rgba(42,54,68,0.8)"
      },
      "data-ocid": "admin.product.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl gradient-text", children: initial ? "Edit Product" : "Add New Product" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Title *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.title,
                onChange: (e) => set("title", e.target.value),
                placeholder: "Product title",
                className: "bg-white/5 border-white/10",
                "data-ocid": "admin.product.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.category,
                onValueChange: (v) => set("category", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "bg-white/5 border-white/10",
                      "data-ocid": "admin.product.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectContent,
                    {
                      style: {
                        background: "rgba(5, 2, 15, 0.97)",
                        border: "1px solid rgba(42,54,68,0.8)"
                      },
                      children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c))
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: form.stock,
                onChange: (e) => set("stock", e.target.value),
                className: "bg-white/5 border-white/10",
                "data-ocid": "admin.product.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Price ($)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                step: "0.01",
                value: form.price,
                onChange: (e) => set("price", e.target.value),
                className: "bg-white/5 border-white/10",
                "data-ocid": "admin.product.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Original Price ($)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                step: "0.01",
                value: form.originalPrice,
                onChange: (e) => set("originalPrice", e.target.value),
                className: "bg-white/5 border-white/10",
                "data-ocid": "admin.product.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: form.description,
                onChange: (e) => set("description", e.target.value),
                rows: 3,
                placeholder: "Product description",
                className: "bg-white/5 border-white/10 resize-none",
                "data-ocid": "admin.product.textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Sizes (comma-separated)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.sizes,
                onChange: (e) => set("sizes", e.target.value),
                placeholder: "S, M, L, XL",
                className: "bg-white/5 border-white/10",
                "data-ocid": "admin.product.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Colors (comma-separated hex)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.colors,
                onChange: (e) => set("colors", e.target.value),
                placeholder: "#FF0000, #00FF00",
                className: "bg-white/5 border-white/10",
                "data-ocid": "admin.product.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 col-span-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  checked: form.isFlashSale,
                  onCheckedChange: (v) => set("isFlashSale", !!v),
                  className: "border-luxe-cyan data-[state=checked]:bg-luxe-cyan",
                  "data-ocid": "admin.product.checkbox"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Flash Sale" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  checked: form.isTrending,
                  onCheckedChange: (v) => set("isTrending", !!v),
                  className: "border-luxe-cyan data-[state=checked]:bg-luxe-cyan",
                  "data-ocid": "admin.product.checkbox"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Trending" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: onClose,
              className: "border-white/20",
              "data-ocid": "admin.product.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSubmit,
              disabled: mutation.isPending,
              className: "bg-luxe-cyan text-black hover:bg-luxe-cyan/90 font-semibold",
              "data-ocid": "admin.product.submit_button",
              children: mutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                " Saving..."
              ] }) : initial ? "Update Product" : "Add Product"
            }
          )
        ] })
      ]
    }
  ) });
}
function AdminPage() {
  const { identity, isInitializing, login, isLoggingIn } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: products, isLoading: productsLoading } = useAllProducts();
  const mutation = useCreateOrUpdateProduct();
  const claimAdmin = useClaimAdmin();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editProduct, setEditProduct] = reactExports.useState();
  const [adminToken, setAdminToken] = reactExports.useState("");
  const openAdd = () => {
    setEditProduct(void 0);
    setModalOpen(true);
  };
  const openEdit = (p) => {
    setEditProduct(p);
    setModalOpen(true);
  };
  const handleDelete = async (p) => {
    try {
      await mutation.mutateAsync({ ...p, stock: 0n });
      ue.success(`"${p.title}" removed from stock`);
    } catch {
      ue.error("Failed to remove product");
    }
  };
  const handleClaimAdmin = async () => {
    try {
      await claimAdmin.mutateAsync(adminToken);
      ue.success("Admin access granted!");
      setAdminToken("");
    } catch {
      ue.error("Invalid token or admin already assigned.");
    }
  };
  if (isInitializing || adminLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen flex items-center justify-center",
        "data-ocid": "admin.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-luxe-cyan" })
      }
    );
  }
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "glass-card rounded-3xl p-10 max-w-md w-full text-center space-y-6",
        "data-ocid": "admin.login_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "mx-auto h-12 w-12 text-luxe-cyan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Login Required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Please log in to access the admin panel." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => login(),
              disabled: isLoggingIn,
              className: "bg-luxe-cyan text-black hover:bg-luxe-cyan/90 w-full font-semibold",
              "data-ocid": "admin.login_button",
              children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                "Logging in..."
              ] }) : "Login with Internet Identity"
            }
          )
        ]
      }
    ) });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "glass-card rounded-3xl p-10 max-w-md w-full space-y-6",
        "data-ocid": "admin.setup.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "mx-auto h-12 w-12 text-luxe-cyan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Admin Setup" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Enter your admin secret token to claim admin access. This is set once – the first person to use the correct token becomes the store admin." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Secret Token" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "password",
                value: adminToken,
                onChange: (e) => setAdminToken(e.target.value),
                placeholder: "Enter admin secret token",
                className: "bg-white/5 border-white/10",
                onKeyDown: (e) => e.key === "Enter" && handleClaimAdmin(),
                "data-ocid": "admin.setup.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleClaimAdmin,
              disabled: claimAdmin.isPending || !adminToken.trim(),
              className: "bg-luxe-cyan text-black hover:bg-luxe-cyan/90 font-semibold w-full",
              "data-ocid": "admin.setup.primary_button",
              children: claimAdmin.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                " Claiming..."
              ] }) : "Claim Admin Access"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "border-white/20 w-full",
              "data-ocid": "admin.setup.cancel_button",
              children: "Go Home"
            }
          ) })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pt-28 pb-20 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.section,
      {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        className: "max-w-7xl mx-auto mb-10",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2", children: "Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl font-black", children: [
              "Admin ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Panel" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Manage your product catalog" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: openAdd,
              className: "bg-luxe-cyan text-black hover:bg-luxe-cyan/90 font-semibold flex items-center gap-2 self-start md:self-auto",
              "data-ocid": "admin.product.open_modal_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
                "Add Product"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.section,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.1 },
        className: "max-w-7xl mx-auto mb-8 grid grid-cols-2 md:grid-cols-4 gap-4",
        children: [
          {
            label: "Total Products",
            value: (products == null ? void 0 : products.length) ?? 0,
            color: "text-luxe-cyan"
          },
          {
            label: "Flash Sale",
            value: (products == null ? void 0 : products.filter((p) => p.isFlashSale).length) ?? 0,
            color: "text-orange-400"
          },
          {
            label: "Trending",
            value: (products == null ? void 0 : products.filter((p) => p.isTrending).length) ?? 0,
            color: "text-purple-400"
          },
          {
            label: "Low Stock",
            value: (products == null ? void 0 : products.filter((p) => p.stock < 10n).length) ?? 0,
            color: "text-red-400"
          }
        ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-wider mb-1", children: stat.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-3xl font-black ${stat.color}`, children: stat.value })
        ] }, stat.label))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.section,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.2 },
        className: "max-w-7xl mx-auto",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-3xl overflow-hidden", children: productsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center justify-center py-20",
            "data-ocid": "admin.products.loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-luxe-cyan" })
          }
        ) : !(products == null ? void 0 : products.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-20 text-muted-foreground",
            "data-ocid": "admin.products.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: "No products yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Add your first product to get started" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "admin.products.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-white/10 hover:bg-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Tags" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-xs uppercase tracking-wider text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: products.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              className: "border-white/10 hover:bg-white/5 transition-colors",
              "data-ocid": `admin.products.row.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium max-w-[200px] truncate", children: product.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "border-white/20 text-muted-foreground text-xs",
                    children: product.category
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-luxe-cyan font-semibold", children: [
                    "$",
                    product.price.toFixed(2)
                  ] }),
                  product.originalPrice > product.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground line-through text-xs ml-2", children: [
                    "$",
                    product.originalPrice.toFixed(2)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: product.stock < 10n ? "text-red-400" : "text-green-400",
                    children: String(product.stock)
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 flex-wrap", children: [
                  product.isFlashSale && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-orange-500/20 text-orange-300 border-orange-500/30 text-[10px]", children: "Flash" }),
                  product.isTrending && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-[10px]", children: "Trending" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      onClick: () => openEdit(product),
                      className: "h-8 w-8 p-0 hover:bg-luxe-cyan/20 hover:text-luxe-cyan",
                      "data-ocid": `admin.products.edit_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 14 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      onClick: () => handleDelete(product),
                      disabled: mutation.isPending,
                      className: "h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400",
                      "data-ocid": `admin.products.delete_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                    }
                  )
                ] }) })
              ]
            },
            product.id
          )) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProductFormModal,
      {
        open: modalOpen,
        onClose: () => setModalOpen(false),
        initial: editProduct
      }
    )
  ] });
}
export {
  AdminPage as default
};
