"use client";

import { STYLES, SKY_OPTIONS, RENOVATION_OPTIONS, PLATFORMS, TONES, EXTERIOR_STYLES, LANDSCAPE_OPTIONS, WALL_COLORS, SOCIAL_PLATFORMS, FLOORING_OPTIONS, KITCHEN_STYLES, SEASON_OPTIONS, DECOR_OPTIONS, COMMERCIAL_TYPES, BATHROOM_STYLES } from "@/lib/constants";
import type { Mode, Style, SkyType, RenovationType, Platform, Tone, ExteriorStyle, LandscapeType, WallColor, SocialPlatform, FlooringType, KitchenStyle, SeasonType, DecorType, CommercialType, BathroomStyle } from "@/types";
import type { GenerateService } from "../_hooks/useGenerateService";

interface Props {
  mode: Mode;
  service: GenerateService;
}

export default function ModeControls({ mode, service }: Props) {
  return (
    <>
      {/* Style chips (redesign & staging) */}
      {(mode === "redesign" || mode === "staging") && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => service.setStyle(s.id as Style)}
                className={`rounded-lg px-3 py-2 text-sm transition-all ${
                  service.style === s.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
          {service.style === "custom" && (
            <input
              type="text"
              value={service.customStyle}
              onChange={(e) => service.setCustomStyle(e.target.value)}
              placeholder="Опишите стиль: марокканский с арками, лаунж-бар, детская..."
              className="mt-3 w-full bg-white/8 rounded-lg px-4 py-3 text-base text-white placeholder:text-white/40 focus:bg-white/12 focus:outline-none"
            />
          )}
        </div>
      )}

      {/* Sky type chips */}
      {mode === "sky" && (
        <div className="mt-4 flex flex-wrap gap-2">
          {SKY_OPTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => service.setSkyType(s.id as SkyType)}
              className={`rounded-lg px-4 py-2 text-sm transition-all ${
                service.skyType === s.id
                  ? "bg-white text-[#1E1B18]"
                  : "bg-white/8 text-white/70 hover:bg-white/12"
              }`}
            >
              {s.emoji} {s.name}
            </button>
          ))}
        </div>
      )}

      {/* Renovation type chips */}
      {mode === "renovation" && (
        <div className="mt-4 flex flex-wrap gap-2">
          {RENOVATION_OPTIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => service.setRenovationType(r.id as RenovationType)}
              className={`rounded-lg px-4 py-2 text-sm transition-all ${
                service.renovationType === r.id
                  ? "bg-white text-[#1E1B18]"
                  : "bg-white/8 text-white/70 hover:bg-white/12"
              }`}
            >
              {r.emoji} {r.name}
            </button>
          ))}
        </div>
      )}

      {/* Exterior style chips */}
      {mode === "exterior" && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {EXTERIOR_STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => service.setExteriorStyle(s.id as ExteriorStyle)}
                className={`rounded-lg px-3 py-2 text-sm transition-all ${
                  service.exteriorStyle === s.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
          {service.exteriorStyle === "custom" && (
            <input
              type="text"
              value={service.customExterior}
              onChange={(e) => service.setCustomExterior(e.target.value)}
              placeholder="Опишите стиль: кирпичный лофт, панельный модерн..."
              className="mt-3 w-full bg-white/8 rounded-lg px-4 py-3 text-base text-white placeholder:text-white/40 focus:bg-white/12 focus:outline-none"
            />
          )}
        </div>
      )}

      {/* Landscape type chips */}
      {mode === "landscape" && (
        <div className="mt-4 flex flex-wrap gap-2">
          {LANDSCAPE_OPTIONS.map((l) => (
            <button
              key={l.id}
              onClick={() => service.setLandscapeType(l.id as LandscapeType)}
              className={`rounded-lg px-4 py-2 text-sm transition-all ${
                service.landscapeType === l.id
                  ? "bg-white text-[#1E1B18]"
                  : "bg-white/8 text-white/70 hover:bg-white/12"
              }`}
            >
              {l.emoji} {l.name}
            </button>
          ))}
        </div>
      )}

      {/* Wall color picker with color swatches */}
      {mode === "wallcolor" && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {WALL_COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => service.setWallColor(c.id as WallColor)}
                className={`rounded-lg px-3 py-2 text-sm transition-all flex items-center gap-2 ${
                  service.wallColor === c.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                {c.name}
              </button>
            ))}
          </div>
          {service.wallColor === "custom" && (
            <input
              type="text"
              value={service.customWallColor}
              onChange={(e) => service.setCustomWallColor(e.target.value)}
              placeholder="Опишите цвет: тёплый персиковый, пыльная роза, мятный..."
              className="mt-3 w-full bg-white/8 rounded-lg px-4 py-3 text-base text-white placeholder:text-white/40 focus:bg-white/12 focus:outline-none"
            />
          )}
        </div>
      )}

      {/* Social platform selector */}
      {mode === "social" && (
        <div className="mt-4">
          <p className="text-xs text-neutral-500 mb-2">Соцсеть</p>
          <div className="flex flex-wrap gap-2">
            {SOCIAL_PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => service.setSocialPlatform(p.id as SocialPlatform)}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  service.socialPlatform === p.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                {p.emoji} {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Platform selector for listing mode */}
      {mode === "listing" && (
        <div className="mt-4">
          <p className="text-xs text-neutral-500 mb-2">Площадка</p>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => service.setPlatform(p.id as Platform)}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  service.platform === p.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Platform & tone selectors for describe mode */}
      {mode === "describe" && (
        <div className="mt-4 space-y-3">
          <div>
            <p className="text-xs text-neutral-500 mb-2">Площадка</p>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => service.setPlatform(p.id as Platform)}
                  className={`rounded-lg px-4 py-2 text-sm transition-all ${
                    service.platform === p.id
                      ? "bg-white text-[#1E1B18]"
                      : "bg-white/8 text-white/70 hover:bg-white/12"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-neutral-500 mb-2">Стиль текста</p>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => service.setTone(t.id as Tone)}
                  className={`rounded-lg px-4 py-2 text-sm transition-all ${
                    service.tone === t.id
                      ? "bg-white text-[#1E1B18]"
                      : "bg-white/8 text-white/70 hover:bg-white/12"
                  }`}
                >
                  {t.emoji} {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Flooring type chips */}
      {mode === "flooring" && (
        <div className="mt-4">
          <p className="text-sm text-white/50 mb-2">Покрытие</p>
          <div className="flex flex-wrap gap-2">
            {FLOORING_OPTIONS.map((f) => (
              <button
                key={f.id}
                onClick={() => service.setFlooringType(f.id as FlooringType)}
                className={`rounded-lg px-3 py-2 text-sm transition-all ${
                  service.flooringType === f.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                {f.emoji} {f.name}
              </button>
            ))}
          </div>
          {service.flooringType === "custom" && (
            <input
              type="text"
              value={service.customFlooring}
              onChange={(e) => service.setCustomFlooring(e.target.value)}
              placeholder="Опишите покрытие: тёмный дуб, светлый бамбук..."
              className="mt-3 w-full bg-white/8 rounded-lg px-4 py-3 text-base text-white placeholder:text-white/40 focus:bg-white/12 focus:outline-none"
            />
          )}
        </div>
      )}

      {/* Kitchen style chips */}
      {mode === "kitchen" && (
        <div className="mt-4">
          <p className="text-sm text-white/50 mb-2">Стиль кухни</p>
          <div className="flex flex-wrap gap-2">
            {KITCHEN_STYLES.map((k) => (
              <button
                key={k.id}
                onClick={() => service.setKitchenStyle(k.id as KitchenStyle)}
                className={`rounded-lg px-3 py-2 text-sm transition-all ${
                  service.kitchenStyle === k.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                {k.emoji} {k.name}
              </button>
            ))}
          </div>
          {service.kitchenStyle === "custom" && (
            <input
              type="text"
              value={service.customKitchen}
              onChange={(e) => service.setCustomKitchen(e.target.value)}
              placeholder="Опишите стиль: кухня в стиле прованс с островом..."
              className="mt-3 w-full bg-white/8 rounded-lg px-4 py-3 text-base text-white placeholder:text-white/40 focus:bg-white/12 focus:outline-none"
            />
          )}
        </div>
      )}

      {/* Season type chips */}
      {mode === "season" && (
        <div className="mt-4">
          <p className="text-sm text-white/50 mb-2">Сезон</p>
          <div className="flex flex-wrap gap-2">
            {SEASON_OPTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => service.setSeasonType(s.id as SeasonType)}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  service.seasonType === s.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Decor type chips */}
      {mode === "decor" && (
        <div className="mt-4">
          <p className="text-sm text-white/50 mb-2">Праздник</p>
          <div className="flex flex-wrap gap-2">
            {DECOR_OPTIONS.map((d) => (
              <button
                key={d.id}
                onClick={() => service.setDecorType(d.id as DecorType)}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  service.decorType === d.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                {d.emoji} {d.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Commercial type chips */}
      {mode === "commercial" && (
        <div className="mt-4">
          <p className="text-sm text-white/50 mb-2">Тип помещения</p>
          <div className="flex flex-wrap gap-2">
            {COMMERCIAL_TYPES.map((c) => (
              <button
                key={c.id}
                onClick={() => service.setCommercialType(c.id as CommercialType)}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  service.commercialType === c.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                {c.emoji} {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bathroom style chips */}
      {mode === "bathroom" && (
        <div className="mt-4">
          <p className="text-sm text-white/50 mb-2">Стиль ванной</p>
          <div className="flex flex-wrap gap-2">
            {BATHROOM_STYLES.map((b) => (
              <button
                key={b.id}
                onClick={() => service.setBathroomStyle(b.id as BathroomStyle)}
                className={`rounded-lg px-3 py-2 text-sm transition-all ${
                  service.bathroomStyle === b.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                {b.emoji} {b.name}
              </button>
            ))}
          </div>
          {service.bathroomStyle === "custom" && (
            <input
              type="text"
              value={service.customBathroom}
              onChange={(e) => service.setCustomBathroom(e.target.value)}
              placeholder="Опишите стиль: ванная в стиле спа с камнем..."
              className="mt-3 w-full bg-white/8 rounded-lg px-4 py-3 text-base text-white placeholder:text-white/40 focus:bg-white/12 focus:outline-none"
            />
          )}
        </div>
      )}

      {/* Add item description */}
      {mode === "additem" && (
        <div className="mt-4">
          <p className="text-sm text-white/50 mb-2">Что добавить</p>
          <textarea
            value={service.additemDescription}
            onChange={(e) => service.setAdditemDescription(e.target.value)}
            placeholder="Опишите что добавить: камин к правой стене, большое растение в угол, книжную полку..."
            rows={3}
            className="w-full bg-white/8 rounded-lg px-4 py-3 text-base text-white placeholder:text-white/40 focus:bg-white/12 focus:outline-none resize-none"
          />
        </div>
      )}

      {/* Text render prompt */}
      {mode === "textrender" && (
        <div className="mt-4">
          <p className="text-sm text-white/50 mb-2">Описание для рендера</p>
          <textarea
            value={service.textrenderPrompt}
            onChange={(e) => service.setTextrenderPrompt(e.target.value)}
            placeholder="Опишите что добавить: вывеска «Кофейня» над входом, номер квартиры на двери..."
            rows={3}
            className="w-full bg-white/8 rounded-lg px-4 py-3 text-base text-white placeholder:text-white/40 focus:bg-white/12 focus:outline-none resize-none"
          />
        </div>
      )}
    </>
  );
}
