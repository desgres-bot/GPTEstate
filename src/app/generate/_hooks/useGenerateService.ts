"use client";

import { useState } from "react";
import { COMPARE_STYLES } from "@/lib/constants";
import type { Mode, Style, SkyType, RenovationType, Platform, Tone, ExteriorStyle, LandscapeType, WallColor, SocialPlatform, FlooringType, KitchenStyle, SeasonType, DecorType, CommercialType, BathroomStyle } from "@/types";
import { TEXT_MODES } from "../_data/services";

export function useGenerateService() {
  const [mode, setMode] = useState<Mode>("enhance");
  const [style, setStyle] = useState<Style>("modern");
  const [customStyle, setCustomStyle] = useState("");
  const [skyType, setSkyType] = useState<SkyType>("sunny");
  const [renovationType, setRenovationType] = useState<RenovationType>("white_walls");
  const [platform, setPlatform] = useState<Platform>("avito");
  const [tone, setTone] = useState<Tone>("selling");

  // New mode states
  const [exteriorStyle, setExteriorStyle] = useState<ExteriorStyle>("modern");
  const [customExterior, setCustomExterior] = useState("");
  const [landscapeType, setLandscapeType] = useState<LandscapeType>("full");
  const [wallColor, setWallColor] = useState<WallColor>("white");
  const [customWallColor, setCustomWallColor] = useState("");
  const [socialPlatform, setSocialPlatform] = useState<SocialPlatform>("instagram");
  const [furnishDescription, setFurnishDescription] = useState("");

  // 8 new mode states
  const [flooringType, setFlooringType] = useState<FlooringType>("laminate");
  const [customFlooring, setCustomFlooring] = useState("");
  const [kitchenStyle, setKitchenStyle] = useState<KitchenStyle>("modern_white");
  const [customKitchen, setCustomKitchen] = useState("");
  const [seasonType, setSeasonType] = useState<SeasonType>("summer");
  const [decorType, setDecorType] = useState<DecorType>("newyear");
  const [commercialType, setCommercialType] = useState<CommercialType>("office");
  const [textrenderPrompt, setTextrenderPrompt] = useState("");
  // Batch 3 states
  const [bathroomStyle, setBathroomStyle] = useState<BathroomStyle>("modern_white");
  const [customBathroom, setCustomBathroom] = useState("");
  const [additemDescription, setAdditemDescription] = useState("");

  // Declutter object detection
  type DetectedObject = { id: number; name: string; x: number; y: number };
  const [declutterObjects, setDeclutterObjects] = useState<DetectedObject[]>([]);
  const [declutterSelected, setDeclutterSelected] = useState<Set<number>>(new Set());
  const [declutterDetecting, setDeclutterDetecting] = useState(false);
  const [declutterDetected, setDeclutterDetected] = useState(false);

  // AI Chat Editor (refine)
  const [refinePrompt, setRefinePrompt] = useState("");
  const [refineLoading, setRefineLoading] = useState(false);
  const [refineHistory, setRefineHistory] = useState<string[]>([]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [textResult, setTextResult] = useState<string | null>(null);
  const [compareResults, setCompareResults] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removeDescription, setRemoveDescription] = useState("");
  const [maskDataUrl, setMaskDataUrl] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(true);
  const [copied, setCopied] = useState(false);

  const isTextMode = TEXT_MODES.includes(mode);
  const hasResult = !!(result || textResult || compareResults);

  const handleImageSelect = (file: File, previewUrl: string) => {
    setSelectedFile(file);
    setPreview(previewUrl);
    setResult(null);
    setTextResult(null);
    setCompareResults(null);
    setError(null);
    // Reset declutter state
    setDeclutterObjects([]);
    setDeclutterSelected(new Set());
    setDeclutterDetected(false);
  };

  const handleDeclutterDetect = async () => {
    if (!selectedFile) return;
    setDeclutterDetecting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("mode", "declutter-detect");
      const res = await fetch("/api/generate", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка анализа");
      }
      const data = await res.json();
      const objects = data.objects as DetectedObject[];
      setDeclutterObjects(objects);
      // Select all by default
      setDeclutterSelected(new Set(objects.map(o => o.id)));
      setDeclutterDetected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка анализа");
    } finally {
      setDeclutterDetecting(false);
    }
  };

  const toggleDeclutterObject = (id: number) => {
    setDeclutterSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;

    if (mode === "remove" && !removeDescription.trim() && !maskDataUrl) {
      setError("Опишите текстом что убрать или закрасьте объекты на фото");
      return;
    }

    if (mode === "furnish" && !furnishDescription.trim()) {
      setError("Опишите что заменить и на что. Например: «заменить старый диван на современный серый»");
      return;
    }

    if (mode === "additem" && !additemDescription.trim()) {
      setError("Опишите что добавить. Например: «камин к правой стене» или «большое растение в угол»");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("mode", mode);

      if (mode === "redesign" || mode === "staging") {
        formData.append("style", style);
        if (style === "custom" && customStyle.trim()) {
          formData.append("customStyle", customStyle.trim());
        }
      }
      if (mode === "remove") {
        if (removeDescription.trim()) formData.append("description", removeDescription.trim());
        if (maskDataUrl) formData.append("mask", maskDataUrl);
      }
      if (mode === "describe" || mode === "listing") {
        formData.append("platform", platform);
        if (mode === "describe") formData.append("tone", tone);
      }
      if (mode === "compare") {
        formData.append("styles", JSON.stringify(COMPARE_STYLES.map(s => s.id)));
      }
      if (mode === "sky") {
        formData.append("skyType", skyType);
      }
      if (mode === "renovation") {
        formData.append("renovationType", renovationType);
      }
      // New modes
      if (mode === "exterior") {
        formData.append("exteriorStyle", exteriorStyle);
        if (exteriorStyle === "custom" && customExterior.trim()) {
          formData.append("customExterior", customExterior.trim());
        }
      }
      if (mode === "landscape") {
        formData.append("landscapeType", landscapeType);
      }
      if (mode === "wallcolor") {
        formData.append("wallColor", wallColor);
        if (wallColor === "custom" && customWallColor.trim()) {
          formData.append("customWallColor", customWallColor.trim());
        }
      }
      if (mode === "social") {
        formData.append("socialPlatform", socialPlatform);
      }
      if (mode === "furnish") {
        formData.append("furnishDescription", furnishDescription.trim());
      }
      if (mode === "flooring") {
        formData.append("flooringType", flooringType);
        if (customFlooring) formData.append("customFlooring", customFlooring);
      }
      if (mode === "kitchen") {
        formData.append("kitchenStyle", kitchenStyle);
        if (customKitchen) formData.append("customKitchen", customKitchen);
      }
      if (mode === "season") formData.append("seasonType", seasonType);
      if (mode === "decor") formData.append("decorType", decorType);
      if (mode === "commercial") formData.append("commercialType", commercialType);
      if (mode === "textrender") formData.append("textrenderPrompt", textrenderPrompt);
      if (mode === "bathroom") {
        formData.append("bathroomStyle", bathroomStyle);
        if (customBathroom) formData.append("customBathroom", customBathroom);
      }
      if (mode === "additem") formData.append("additemDescription", additemDescription);
      if (mode === "declutter" && declutterDetected && declutterSelected.size > 0) {
        const selectedNames = declutterObjects
          .filter(o => declutterSelected.has(o.id))
          .map(o => o.name);
        formData.append("declutterObjects", JSON.stringify(selectedNames));
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка генерации");
      }

      const data = await res.json();
      if (mode === "compare" && data.output_urls) {
        setCompareResults(data.output_urls);
      } else if (isTextMode) {
        setTextResult(data.text);
      } else {
        setResult(data.output_url);
        setShowResult(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!result || !refinePrompt.trim()) return;

    setRefineLoading(true);
    setError(null);

    try {
      // Convert data URI to Blob/File for FormData
      const res = await fetch(result);
      const blob = await res.blob();
      const file = new File([blob], "result.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("image", file);
      formData.append("mode", "refine");
      formData.append("refinePrompt", refinePrompt.trim());

      // Send original image as reference for refine
      if (selectedFile) {
        formData.append("originalImage", selectedFile);
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Ошибка доработки");
      }

      const data = await response.json();
      // Save current result to history before replacing
      setRefineHistory(prev => [...prev, result]);
      setResult(data.output_url);
      setRefinePrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка доработки");
    } finally {
      setRefineLoading(false);
    }
  };

  const undoRefine = () => {
    if (refineHistory.length === 0) return;
    const prevResult = refineHistory[refineHistory.length - 1];
    setRefineHistory(prev => prev.slice(0, -1));
    setResult(prevResult);
  };

  const reset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setTextResult(null);
    setCompareResults(null);
    setError(null);
    setRemoveDescription("");
    setFurnishDescription("");
    setTextrenderPrompt("");
    setAdditemDescription("");
    setMaskDataUrl(null);
    setCopied(false);
    setRefinePrompt("");
    setRefineHistory([]);
  };

  const copyToClipboard = async () => {
    if (!textResult) return;
    await navigator.clipboard.writeText(textResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return {
    // Mode & settings
    mode, setMode,
    style, setStyle,
    customStyle, setCustomStyle,
    skyType, setSkyType,
    renovationType, setRenovationType,
    platform, setPlatform,
    tone, setTone,
    // New mode settings
    exteriorStyle, setExteriorStyle,
    customExterior, setCustomExterior,
    landscapeType, setLandscapeType,
    wallColor, setWallColor,
    customWallColor, setCustomWallColor,
    socialPlatform, setSocialPlatform,
    furnishDescription, setFurnishDescription,
    // 8 new mode settings
    flooringType, setFlooringType,
    customFlooring, setCustomFlooring,
    kitchenStyle, setKitchenStyle,
    customKitchen, setCustomKitchen,
    seasonType, setSeasonType,
    decorType, setDecorType,
    commercialType, setCommercialType,
    textrenderPrompt, setTextrenderPrompt,
    // Batch 3 settings
    bathroomStyle, setBathroomStyle,
    customBathroom, setCustomBathroom,
    additemDescription, setAdditemDescription,
    // File & results
    selectedFile,
    preview,
    result,
    textResult,
    compareResults,
    loading,
    error,
    removeDescription, setRemoveDescription,
    maskDataUrl, setMaskDataUrl,
    showResult, setShowResult,
    copied,
    // Computed
    isTextMode,
    hasResult,
    // AI Chat Editor (refine)
    refinePrompt, setRefinePrompt,
    refineLoading,
    refineHistory,
    handleRefine,
    undoRefine,
    // Declutter object detection
    declutterObjects,
    declutterSelected,
    declutterDetecting,
    declutterDetected,
    handleDeclutterDetect,
    toggleDeclutterObject,
    // Actions
    handleImageSelect,
    handleGenerate,
    reset,
    copyToClipboard,
  };
}

export type GenerateService = ReturnType<typeof useGenerateService>;
