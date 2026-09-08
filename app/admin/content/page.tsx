"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Package,
  HelpCircle,
  Sparkles,
  Plus,
  X,
  Upload,
  Tag,
  Type,
  AlignLeft,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Heart,
  Trash2,
} from "lucide-react";
import { GALLERY_IMAGES, AMENITIES, PACKAGES } from "@/lib/mock-data/venue";
import { FAQ_ITEMS } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";
import type { GalleryImage } from "@/lib/types";

const TABS = [
  { id: "gallery", label: "گالری", icon: ImageIcon },
  { id: "amenities", label: "امکانات", icon: Sparkles },
  { id: "packages", label: "پکیج‌ها", icon: Package },
  { id: "faq", label: "سوالات متداول", icon: HelpCircle },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ============================================================
// مودال نمایش تصویر - کاملاً ریسپانسیو
// ============================================================
function ImageModal({
  image,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  totalImages,
  currentIndex,
}: {
  image: GalleryImage;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  totalImages: number;
  currentIndex: number;
}) {
  // مدیریت کیبورد
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-5xl max-h-[95vh] bg-night rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* هدر با دکمه‌های کنترل */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex items-center gap-2 text-white/80">
              <span className="text-xs sm:text-sm font-medium">
                {currentIndex + 1} / {totalImages}
              </span>
              <span className="hidden sm:inline text-xs text-white/50">•</span>
              <span className="hidden sm:inline text-xs text-white/50">{image.category}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={(e) => e.stopPropagation()}
                className="rounded-full bg-white/10 p-1.5 sm:p-2 text-white hover:bg-white/20 transition-colors"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="rounded-full bg-white/10 p-1.5 sm:p-2 text-white hover:bg-white/20 transition-colors"
              >
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={onClose}
                className="rounded-full bg-white/10 p-1.5 sm:p-2 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* دکمه‌های ناوبری */}
          {hasPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-1.5 sm:p-2 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
          )}
          {hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-1.5 sm:p-2 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
          )}

          {/* تصویر */}
          <div className="relative w-full" style={{ height: "clamp(300px, 65vh, 75vh)" }}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 80vw"
              priority
            />
          </div>

          {/* اطلاعات تصویر - پایین */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-6 pt-8 sm:pt-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-lg md:text-xl font-display text-white truncate">
                  {image.caption}
                </h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/10 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-white/80 backdrop-blur-sm">
                    <Tag className="w-3 h-3 sm:w-3 sm:h-3" />
                    {image.category}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/50">
                    {image.width} × {image.height}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="rounded-full bg-gold/20 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs text-gold hover:bg-gold/30 transition-colors">
                  مشاهده در گالری
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================
// مودال افزودن محتوا
// ============================================================
function AddContentModal({
  isOpen,
  onClose,
  tab,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  tab: TabId;
  onAdd: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    caption: "",
    price: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setFormData({ title: "", description: "", category: "", caption: "", price: "" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let newItem: any = {
      id: `new_${Date.now()}`,
    };

    switch (tab) {
      case "gallery":
        newItem = {
          ...newItem,
          src: previewUrl || "/images/venue/placeholder.jpg",
          alt: formData.title,
          caption: formData.caption || formData.title,
          category: formData.category || "عمومی",
          width: 1360,
          height: 1020,
        };
        break;
      case "amenities":
        newItem = {
          ...newItem,
          title: formData.title,
          description: formData.description,
          detail: formData.description,
          category: formData.category || "امکانات",
          image: previewUrl || "/images/venue/placeholder.jpg",
          icon: "sparkles",
        };
        break;
      case "packages":
        newItem = {
          ...newItem,
          name: formData.title,
          tagline: formData.description,
          priceFrom: parseInt(formData.price) || 0,
          suitableFor: "",
          services: [],
          highlighted: false,
        };
        break;
      case "faq":
        newItem = {
          ...newItem,
          question: formData.title,
          answer: formData.description,
          category: formData.category || "عمومی",
        };
        break;
    }

    onAdd(newItem);
    onClose();
  };

  const getPlaceholder = () => {
    switch (tab) {
      case "gallery":
        return { title: "عنوان تصویر", description: "توضیحات تصویر", category: "دسته‌بندی", caption: "زیرنویس تصویر" };
      case "amenities":
        return { title: "نام امکان", description: "توضیحات کامل", category: "دسته‌بندی", caption: "" };
      case "packages":
        return { title: "نام پکیج", description: "توضیحات کوتاه", category: "", caption: "" };
      case "faq":
        return { title: "سوال", description: "پاسخ کامل", category: "دسته‌بندی", caption: "" };
      default:
        return { title: "عنوان", description: "توضیحات", category: "دسته‌بندی", caption: "" };
    }
  };

  const placeholder = getPlaceholder();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-[95vw] sm:max-w-lg md:max-w-xl max-h-[95vh] bg-paper rounded-2xl shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone/20 px-4 sm:px-6 py-3 sm:py-4 bg-paper/95 backdrop-blur-sm">
              <h2 className="font-display text-lg sm:text-xl text-ink">افزودن محتوای جدید</h2>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 hover:bg-stone/10 transition-colors"
              >
                <X className="w-5 h-5 text-ink-soft" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              {(tab === "gallery" || tab === "amenities") && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={cn(
                    "relative border-2 border-dashed rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-all",
                    previewUrl
                      ? "border-gold/50 bg-gold/5"
                      : "border-stone/30 hover:border-gold/50 hover:bg-gold/5"
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  {previewUrl ? (
                    <div className="relative">
                      <div className="relative w-full max-h-48 sm:max-h-64 overflow-hidden rounded-lg">
                        <Image
                          src={previewUrl}
                          alt="پیش‌نمایش"
                          width={400}
                          height={300}
                          className="object-cover w-full h-auto max-h-48 sm:max-h-64"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          setPreviewUrl(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-7 h-7 sm:w-8 sm:h-8 mx-auto text-stone/40" />
                      <p className="mt-2 text-xs sm:text-sm text-ink-soft">
                        برای آپلود کلیک کنید یا تصویر را بکشید و رها کنید
                      </p>
                      <p className="text-[10px] sm:text-xs text-ink-soft/60 mt-1">
                        (فرمت‌های مجاز: JPG, PNG, WebP)
                      </p>
                    </>
                  )}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs sm:text-sm font-medium text-ink">
                  <Type className="w-3.5 h-3.5 inline ml-1" />
                  {tab === "faq" ? "سوال" : "عنوان"}
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={placeholder.title}
                  className="w-full rounded-lg border border-stone/30 bg-paper px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs sm:text-sm font-medium text-ink">
                  <AlignLeft className="w-3.5 h-3.5 inline ml-1" />
                  {tab === "faq" ? "پاسخ" : "توضیحات"}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={placeholder.description}
                  rows={3}
                  className="w-full rounded-lg border border-stone/30 bg-paper px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors resize-none"
                  required
                />
              </div>

              {tab !== "packages" && (
                <div>
                  <label className="mb-1.5 block text-xs sm:text-sm font-medium text-ink">
                    <Tag className="w-3.5 h-3.5 inline ml-1" />
                    دسته‌بندی
                  </label>
                  {tab === "gallery" ? (
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-lg border border-stone/30 bg-paper px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors"
                    >
                      <option value="">انتخاب دسته‌بندی</option>
                      <option value="باغ">باغ</option>
                      <option value="سالن">سالن</option>
                      <option value="عقد">عقد</option>
                      <option value="مراسم شب">مراسم شب</option>
                      <option value="مراسم روز">مراسم روز</option>
                      <option value="گل‌آرایی">گل‌آرایی</option>
                      <option value="سفره عقد">سفره عقد</option>
                      <option value="جایگاه عروس و داماد">جایگاه عروس و داماد</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder={placeholder.category}
                      className="w-full rounded-lg border border-stone/30 bg-paper px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors"
                    />
                  )}
                </div>
              )}

              {tab === "gallery" && (
                <div>
                  <label className="mb-1.5 block text-xs sm:text-sm font-medium text-ink">
                    زیرنویس تصویر
                  </label>
                  <input
                    type="text"
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                    placeholder={placeholder.caption}
                    className="w-full rounded-lg border border-stone/30 bg-paper px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors"
                  />
                </div>
              )}

              {tab === "packages" && (
                <div>
                  <label className="mb-1.5 block text-xs sm:text-sm font-medium text-ink">
                    قیمت پایه (تومان)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="مثلاً: 150000000"
                    className="w-full rounded-lg border border-stone/30 bg-paper px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-stone/30 bg-paper py-2.5 sm:py-3 text-sm font-medium text-ink-soft hover:bg-stone/5 transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gold py-2.5 sm:py-3 text-sm font-medium text-paper transition-transform active:scale-98 hover:bg-gold/90"
                >
                  افزودن محتوا
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// کامپوننت اصلی
// ============================================================
export default function AdminContentPage() {
  const [tab, setTab] = useState<TabId>("gallery");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [items, setItems] = useState({
    gallery: GALLERY_IMAGES,
    amenities: AMENITIES,
    packages: PACKAGES,
    faq: FAQ_ITEMS,
  });

  const currentIndex = items.gallery.findIndex((img) => img.id === selectedImage?.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.gallery.length - 1;

  const handlePrevImage = () => {
    if (hasPrev) {
      setSelectedImage(items.gallery[currentIndex - 1]);
    }
  };

  const handleNextImage = () => {
    if (hasNext) {
      setSelectedImage(items.gallery[currentIndex + 1]);
    }
  };

  const handleAddContent = (newItem: any) => {
    setItems((prev) => ({
      ...prev,
      [tab]: [newItem, ...prev[tab]],
    }));
  };

  const handleDelete = (id: string) => {
    setItems((prev) => ({
      ...prev,
      [tab]: prev[tab].filter((item: any) => item.id !== id),
    }));
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5 mt-12 sm:mt-14 px-2 sm:px-0">
      {/* هدر */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-[26px] text-ink">مدیریت محتوا</h1>
          <p className="text-[11px] sm:text-[13px] text-ink-soft">گالری، امکانات، پکیج‌ها و سوالات متداول</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-forest px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-[13px] font-medium text-paper shadow-lg hover:bg-forest/90 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> افزودن محتوای جدید
        </motion.button>
      </div>

      {/* تب‌ها */}
      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex shrink-0 items-center gap-1 sm:gap-1.5 rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-[12.5px] font-medium transition-all duration-300 whitespace-nowrap",
                tab === t.id
                  ? "border-forest bg-forest text-paper shadow-md"
                  : "border-stone/50 bg-paper text-ink-soft hover:border-stone/70 hover:bg-stone/5"
              )}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t.label}
            </button>
          );
        })}
      </div>

      {/* محتوای تب‌ها */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {tab === "gallery" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {items.gallery.map((img, index) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedImage(img)}
                  className="group relative cursor-pointer overflow-hidden rounded-[var(--radius-lg)] bg-paper border border-stone/50 transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(img.id);
                        }}
                        className="rounded-full bg-red-500/80 p-1.5 text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="rounded-full bg-black/50 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] text-white backdrop-blur-sm">
                        {img.category}
                      </span>
                      <span className="rounded-full bg-gold/80 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] text-paper backdrop-blur-sm">
                        مشاهده
                      </span>
                    </div>
                  </div>
                  <div className="p-1.5 sm:p-2.5">
                    <p className="truncate text-[10px] sm:text-[12px] font-medium text-ink">{img.caption}</p>
                    <p className="text-[9px] sm:text-[10.5px] text-ink-soft">{img.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {tab === "amenities" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {items.amenities.map((a, index) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="group relative rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-3 sm:p-4 transition-shadow hover:shadow-lg"
                >
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400 hover:text-red-600 transition-colors" />
                  </button>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="rounded-full bg-gold/10 p-1.5 sm:p-2 text-gold">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] sm:text-[13.5px] font-medium text-ink group-hover:text-forest transition-colors truncate">
                        {a.title}
                      </p>
                      <p className="mt-1 text-[11px] sm:text-[12px] text-ink-soft line-clamp-2">{a.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {tab === "packages" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {items.packages.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={cn(
                    "relative rounded-[var(--radius-lg)] border p-3 sm:p-4 transition-all hover:shadow-xl",
                    p.highlighted
                      ? "border-gold bg-gradient-to-br from-gold/5 to-transparent"
                      : "border-stone/50 bg-paper"
                  )}
                >
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400 hover:text-red-600 transition-colors" />
                  </button>
                  {p.highlighted && (
                    <span className="absolute -top-2 right-4 rounded-full bg-gold px-2 sm:px-3 py-0.5 text-[8px] sm:text-[10px] font-medium text-paper">
                      محبوب‌ترین
                    </span>
                  )}
                  <p className="font-display text-[15px] sm:text-[17px] text-ink">{p.name}</p>
                  <p className="mt-1 text-[11px] sm:text-[12px] text-ink-soft line-clamp-1">{p.tagline}</p>
                  <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs sm:text-sm font-medium text-gold">
                      {p.priceFrom.toLocaleString()} تومان
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-ink-soft">به‌علاوە</span>
                  </div>
                  <p className="mt-1.5 text-[10px] sm:text-[11px] text-ink-soft">
                    {p.services.length} خدمت فعال
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {tab === "faq" && (
            <div className="flex flex-col gap-2">
              {items.faq.map((f, index) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="group relative rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-3 sm:p-4 transition-shadow hover:shadow-md"
                >
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400 hover:text-red-600 transition-colors" />
                  </button>
                  <div className="flex items-start gap-2 sm:gap-3 pr-6">
                    <div className="mt-0.5 rounded-full bg-forest/10 p-1.5 text-forest">
                      <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] sm:text-[13px] font-medium text-ink truncate">{f.question}</p>
                      <p className="mt-1 text-[11px] sm:text-[12px] text-ink-soft line-clamp-2">{f.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <p className="text-center text-[10px] sm:text-[11px] text-ink-soft py-2">
        در این نسخه نمایشی، آپلود واقعی غیرفعال است و تغییرات ذخیره نمی‌شوند.
      </p>

      {/* مودال نمایش تصویر - فقط زمانی که تصویر وجود داره */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          hasNext={hasNext}
          hasPrev={hasPrev}
          totalImages={items.gallery.length}
          currentIndex={currentIndex}
        />
      )}

      {/* مودال افزودن محتوا */}
      <AddContentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        tab={tab}
        onAdd={handleAddContent}
      />
    </div>
  );
}