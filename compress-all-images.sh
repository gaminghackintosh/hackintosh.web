#!/bin/bash

# ═══════════════════════════════════════════════════════════════════
#  Скрипт сжатия ВСЕХ больших изображений (>100KB)
#  Оптимизация для hackintosh.web
# ═══════════════════════════════════════════════════════════════════

set -e

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║  🗜️  СЖАТИЕ ИЗОБРАЖЕНИЙ ДЛЯ HACKINTOSH.WEB                     ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Проверка pngquant
if ! command -v pngquant &> /dev/null; then
    echo "❌ pngquant не найден!"
    echo "   Установите: brew install pngquant"
    echo ""
    exit 1
fi

# Проверка cwebp для WebP
if ! command -v cwebp &> /dev/null; then
    echo "⚠️  cwebp не найден (опционально для WebP)"
    echo "   Установите: brew install webp"
    echo ""
fi

TOTAL_SAVED=0
FILES_PROCESSED=0

# Функция сжатия PNG
compress_png() {
    local file="$1"
    local quality="$2"
    local size_before=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    
    # Сжимаем с pngquant
    pngquant --quality="$quality" --force --output "$file" "$file" 2>/dev/null
    
    local size_after=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    local saved=$((size_before - size_after))
    local percent=$((saved * 100 / size_before))
    
    TOTAL_SAVED=$((TOTAL_SAVED + saved))
    FILES_PROCESSED=$((FILES_PROCESSED + 1))
    
    echo "  ✅ $(basename "$file") | $(numfmt --to=iec $size_before) → $(numfmt --to=iec $size_after) (-${percent}%)"
}

# ═══════════════════════════════════════════════════════════════════
#  1. ОБОИ (Wallpapers) — самое важное!
# ═══════════════════════════════════════════════════════════════════

echo "📦 1. Сжатие обоев (Wallpapers)..."
echo "   Качество: 50-70% (максимальное сжатие)"
echo ""

# Sequoia обои (очень большие!)
for file in src/assets/images/wallpapers/Sequoia/*.png; do
    if [ -f "$file" ]; then
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        if [ "$size" -gt 100000 ]; then
            compress_png "$file" "50-70"
        fi
    fi
done

# Tahoe обои
for file in src/assets/images/wallpapers/Tahoe/*.png; do
    if [ -f "$file" ]; then
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        if [ "$size" -gt 100000 ]; then
            compress_png "$file" "50-70"
        fi
    fi
done

echo ""

# ═══════════════════════════════════════════════════════════════════
#  2. ЛОГОТИПЫ (Logos)
# ═══════════════════════════════════════════════════════════════════

echo "📦 2. Сжатие логотипов..."
echo "   Качество: 60-75%"
echo ""

for file in src/assets/images/logo/*.png; do
    if [ -f "$file" ]; then
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        if [ "$size" -gt 50000 ]; then
            compress_png "$file" "60-75"
        fi
    fi
done

echo ""

# ═══════════════════════════════════════════════════════════════════
#  3. ИКОНКИ ПРИЛОЖЕНИЙ (App Icons)
# ═══════════════════════════════════════════════════════════════════

echo "📦 3. Сжатие иконок приложений..."
echo "   Качество: 70-85% (хорошее качество для иконок)"
echo ""

# Light темы
for file in src/assets/icons/apps/Light_Themes/*.png; do
    if [ -f "$file" ]; then
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        if [ "$size" -gt 50000 ]; then
            compress_png "$file" "70-85"
        fi
    fi
done

# Dark темы
for file in src/assets/icons/apps/Dark_Themes/*.png; do
    if [ -f "$file" ]; then
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        if [ "$size" -gt 50000 ]; then
            compress_png "$file" "70-85"
        fi
    fi
done

echo ""

# ═══════════════════════════════════════════════════════════════════
#  4. ИКОНКИ НАСТРОЕК (Settings Icons)
# ═══════════════════════════════════════════════════════════════════

echo "📦 4. Сжатие иконок настроек..."
echo "   Качество: 70-85%"
echo ""

for dir in src/assets/icons/Settings_menuSections/*/; do
    if [ -d "$dir" ]; then
        for file in "$dir"*.png; do
            if [ -f "$file" ]; then
                size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
                if [ "$size" -gt 30000 ]; then
                    compress_png "$file" "70-85"
                fi
            fi
        done
    fi
done

echo ""

# ═══════════════════════════════════════════════════════════════════
#  5. PRELOADER ИКОНКИ
# ═══════════════════════════════════════════════════════════════════

echo "📦 5. Сжатие preloader иконок..."
echo "   Качество: 60-80%"
echo ""

for file in src/assets/icons/preloader/*.png; do
    if [ -f "$file" ]; then
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        if [ "$size" -gt 50000 ]; then
            compress_png "$file" "60-80"
        fi
    fi
done

echo ""

# ═══════════════════════════════════════════════════════════════════
#  6. SAFARI WALLPAPERS
# ═══════════════════════════════════════════════════════════════════

echo "📦 6. Сжатие Safari фонов..."
echo "   Качество: 60-75%"
echo ""

for file in src/assets/images/Safari_Wallpapers/*.webp; do
    if [ -f "$file" ]; then
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        if [ "$size" -gt 50000 ]; then
            echo "  ⚠️  $(basename "$file") | WebP файл (пропущено)"
        fi
    fi
done

echo ""

# ═══════════════════════════════════════════════════════════════════
#  ИТОГИ
# ═══════════════════════════════════════════════════════════════════

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║  📊 ИТОГИ СЖАТИЯ                                                ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "  Файлов обработано: $FILES_PROCESSED"
echo "  Сэкономлено: $(numfmt --to=iec $TOTAL_SAVED)"
echo ""
echo "  ✅ Сжатие завершено!"
echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║  🚀 СЛЕДУЮЩИЕ ШАГИ:                                             ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "  1. Проверьте визуально качество изображений"
echo "  2. Запустите сборку: npm run build"
echo "  3. Задеплойте: npm run deploy"
echo ""
