// components/musicians/MusiciansSection.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Music, 
  Star, 
  Calendar, 
  Award, 
  ChevronRight, 
  Users, 
  Mic2,
  Heart,
  ExternalLink,
  Clock,
  Sparkles
} from "lucide-react";
import { MUSICIANS, MUSIC_VIDEOS } from "@/lib/mock-data/musicians";
import { Card } from "@/components/ui/Card";

const ease = [0.16, 1, 0.3, 1] as const;

interface MusicianCardProps {
  musician: typeof MUSICIANS[0];
  index: number;
  onPlayVideo: (url: string) => void;
}

function MusicianCard({ musician, index, onPlayVideo }: MusicianCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease, delay: index * 0.08 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-gradient-to-br from-night/95 to-forest/90 p-[1px]">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/5 to-transparent opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
        
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-paper p-5">
          {/* Background pattern */}
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/5 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-forest-tint/20 blur-2xl" />

          <div className="relative flex flex-col gap-4">
            {/* Header with image and badge */}
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                  <Image
                    src={musician.image}
                    alt={musician.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
                </div>
                {/* Live indicator */}
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold shadow-lg shadow-gold/30">
                  <Music size={10} className="text-night" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-[17px] font-bold text-ink">{musician.name}</h4>
                  <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[9px] font-bold text-gold-deep">
                    {musician.experience}+ سال
                  </span>
                </div>
                <p className="text-[12px] font-medium text-gold-deep">{musician.instrumentFa}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {musician.style.slice(0, 2).map((s) => (
                    <span key={s} className="rounded-full bg-forest-tint/30 px-2 py-0.5 text-[8px] text-forest">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-[12px] leading-6 text-ink-soft line-clamp-2">
              {musician.bio}
            </p>

            {/* Specialty badge */}
            <div className="flex items-center gap-2 rounded-lg bg-gold/5 px-3 py-1.5 border border-gold/10">
              <Award size={12} className="text-gold-deep" />
              <span className="text-[10px] font-medium text-ink-soft">{musician.specialty}</span>
            </div>

            {/* Performance list with play buttons */}
            <div className="space-y-1.5">
              {musician.performances.map((perf, idx) => (
                <button
                  key={idx}
                  onClick={() => onPlayVideo(musician.videoUrl)}
                  className="group/play flex w-full items-center gap-2 rounded-lg bg-stone/20 px-3 py-2 transition-all hover:bg-gold/10"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-night transition-transform group-hover/play:scale-110">
                    <Play size={11} className="fill-night" />
                  </span>
                  <span className="flex-1 text-[11px] font-medium text-ink text-right">{perf.title}</span>
                  <span className="text-[9px] text-ink-soft">{perf.duration}</span>
                </button>
              ))}
            </div>

            {/* Watch full video button */}
            <button
              onClick={() => onPlayVideo(musician.videoUrl)}
              className="group/btn relative overflow-hidden rounded-lg bg-gradient-to-r from-gold to-gold-deep px-4 py-2.5 text-center text-[11px] font-bold text-night transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                مشاهده اجراهای زنده
                <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity group-hover/btn:opacity-100" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  onClose: () => void;
}

function VideoModal({ isOpen, videoUrl, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 p-4 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-[var(--radius-xl)] bg-paper"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -right-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-night/80 text-on-night backdrop-blur-sm transition-all hover:scale-110 hover:bg-night"
            >
              ✕
            </button>

            {/* Video player */}
            <div className="aspect-video w-full bg-night">
              <iframe
                src={videoUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video info */}
            <div className="p-5">
              <h3 className="font-display text-[18px] text-ink">اجرای زنده در عمارت یلان</h3>
              <p className="mt-1 text-[13px] text-ink-soft">
                تجربه‌ای شنیداری از نوازندگان حرفه‌ای ارکستر آوان در فضایی رویایی
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Featured videos section
function FeaturedVideos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease, delay: 0.3 }}
      className="mt-6"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20">
          <Sparkles size={12} className="text-gold-deep" />
        </div>
        <h4 className="font-display text-[15px] text-ink">اجراهای ویژه ارکستر آوان</h4>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {MUSIC_VIDEOS.slice(0, 2).map((video) => (
          <Link
            key={video.id}
            href={video.videoUrl}
            target="_blank"
            className="group/video relative overflow-hidden rounded-[var(--radius-lg)]"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-700 group-hover/video:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/40 to-transparent" />
              
              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-2xl shadow-gold/30 transition-transform duration-300 group-hover/video:scale-110">
                  <Play size={22} className="fill-night text-night" />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 rounded-full bg-night/80 px-2.5 py-1 text-[9px] font-medium text-on-night backdrop-blur-sm">
                {video.duration}
              </div>

              {/* Musician names */}
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                {video.musicians.slice(0, 2).map((name) => (
                  <span key={name} className="rounded-full bg-night/60 px-2 py-0.5 text-[7px] text-on-night backdrop-blur-sm">
                    {name}
                  </span>
                ))}
                {video.musicians.length > 2 && (
                  <span className="rounded-full bg-night/60 px-2 py-0.5 text-[7px] text-on-night backdrop-blur-sm">
                    +{video.musicians.length - 2}
                  </span>
                )}
              </div>
            </div>
            
            <div className="absolute bottom-12 left-3 right-3">
              <p className="text-[11px] font-medium text-white text-shadow">{video.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

// Main component
export function MusiciansSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="mt-9">
      {/* Section header */}
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
            <Mic2 size={18} className="text-gold-deep" />
          </div>
          <div>
            <h3 className="font-display text-[20px] text-ink">نوازندگان ارکستر آوان</h3>
            <p className="text-[11px] text-ink-soft">اجرای زنده در محوطه باغ عمارت یلان</p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 text-[12.5px] leading-6 text-ink-soft"
        >
          با حضور هنرمندان برجسته، موسیقی‌های ماندگاری را در فضای باغ تجربه کنید.
        </motion.p>
      </div>

      {/* Musicians grid */}
      <div className="mt-4 grid grid-cols-1 gap-3 px-5 md:grid-cols-2 lg:grid-cols-3">
        {MUSICIANS.map((musician, index) => (
          <MusicianCard
            key={musician.id}
            musician={musician}
            index={index}
            onPlayVideo={(url) => setSelectedVideo(url)}
          />
        ))}
      </div>

      {/* Featured videos */}
      <div className="px-5">
        <FeaturedVideos />
      </div>

      {/* Link to full page */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 px-5"
      >
        <Link
          href="/musicians"
          className="flex items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-gold-deep/30 bg-gold/5 px-6 py-3.5 text-[13px] font-medium text-gold-deep transition-all hover:bg-gold/10 active:scale-[0.98]"
        >
          <span>مشاهده همه نوازندگان و اجراها</span>
          <Users size={16} />
        </Link>
      </motion.div>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        videoUrl={selectedVideo || ""}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}