import React, { useState } from 'react';
import { Check, Copy, Download, X } from 'lucide-react';
import { SHAREABLE_STORY_CARDS } from '../data/ecologyContent';
import type { ShareableStoryCard } from '../types/ecology';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSharedSuccess: (cardTitle: string) => void;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  onSharedSuccess,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string>(SHAREABLE_STORY_CARDS[0].id);
  const [copied, setCopied] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeCard: ShareableStoryCard =
    SHAREABLE_STORY_CARDS.find((c) => c.id === selectedCardId) || SHAREABLE_STORY_CARDS[0];

  const handleCopyText = async () => {
    const shareText = `${activeCard.title}\n\n${activeCard.statCallout} — ${activeCard.summary}\n\n${activeCard.takeaway} (via Grounded Field Notes)`;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      onSharedSuccess(`Shared field note: ${activeCard.numberLabel}`);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    }
  };

  const handleDownloadPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Warm archival paper background
    ctx.fillStyle = '#FBF9F5';
    ctx.fillRect(0, 0, 1080, 1080);

    // Subtle inset frame
    ctx.strokeStyle = 'rgba(29, 45, 39, 0.16)';
    ctx.lineWidth = 2;
    ctx.strokeRect(56, 56, 968, 968);

    // Header kicker
    ctx.fillStyle = '#5A6B62';
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`GROUNDED  ·  ${activeCard.numberLabel.toUpperCase()}`, 108, 148);

    // Divider
    ctx.beginPath();
    ctx.moveTo(108, 184);
    ctx.lineTo(972, 184);
    ctx.stroke();

    // Helper for wrapped text
    const wrapText = (
      text: string,
      x: number,
      startY: number,
      maxWidth: number,
      lineHeight: number
    ) => {
      const words = text.split(' ');
      let line = '';
      let y = startY;
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(line.trim(), x, y);
          line = words[i] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), x, y);
      return y + lineHeight;
    };

    // Serif Headline
    ctx.fillStyle = '#1D2D27';
    ctx.font = '600 54px Georgia, serif';
    const afterTitleY = wrapText(activeCard.title, 108, 286, 864, 70);

    // Stat callout box
    ctx.fillStyle = '#E8EFEA';
    ctx.fillRect(108, afterTitleY + 28, 864, 96);
    ctx.fillStyle = '#1F3A2E';
    ctx.font = '600 32px monospace';
    ctx.fillText(activeCard.statCallout, 140, afterTitleY + 88);

    // Body summary
    ctx.fillStyle = '#42524A';
    ctx.font = '400 31px "Plus Jakarta Sans", sans-serif';
    const afterBodyY = wrapText(activeCard.summary, 108, afterTitleY + 196, 864, 48);

    // Takeaway footer
    ctx.fillStyle = '#A84E32';
    ctx.font = 'italic 30px Georgia, serif';
    wrapText(`“${activeCard.takeaway}”`, 108, Math.max(afterBodyY + 56, 880), 864, 44);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${activeCard.id}-grounded.png`;
    link.href = dataUrl;
    link.click();

    setDownloaded(true);
    onSharedSuccess(`Exported visual story card: ${activeCard.numberLabel}`);
    setTimeout(() => setDownloaded(false), 2600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-card-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D2D27]/55 backdrop-blur-xs"
    >
      <div className="w-full max-w-xl bg-[#FBF9F5] border border-[#1D2D27]/15 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-xs text-[#5A6B62] mb-1">
              Tier 03 Systemic Push <span aria-hidden="true">·</span> Shareable Field Card
            </p>
            <h3 id="share-card-modal-title" className="font-serif text-2xl text-[#1D2D27]">
              Pass along wonder, not worry
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close card studio"
            className="p-2 rounded-lg text-[#42524A] hover:text-[#1D2D27] hover:bg-[#EBE6DC] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Selector */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-[#EBE6DC] rounded-lg mb-6">
          {SHAREABLE_STORY_CARDS.map((card, idx) => {
            const active = card.id === activeCard.id;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setSelectedCardId(card.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#FBF9F5] text-[#1D2D27] shadow-xs'
                    : 'text-[#4C5D54] hover:text-[#1D2D27]'
                }`}
              >
                0{idx + 1}.{' '}
                {idx === 0 ? 'Quiet Filter' : idx === 1 ? 'Micro-Climate' : 'Soil Sponge'}
              </button>
            );
          })}
        </div>

        {/* Visual Card Preview */}
        <div className="bg-[#F3EFE6] border border-[#1D2D27]/12 rounded-xl p-6 mb-6">
          <p className="text-xs text-[#5A6B62] mb-3">{activeCard.numberLabel}</p>
          <h4 className="font-serif text-xl sm:text-2xl text-[#1D2D27] leading-snug mb-4">
            {activeCard.title}
          </h4>
          <p className="font-mono text-sm font-semibold text-[#1F3A2E] py-2.5 px-3.5 bg-[#E3ECE5] rounded-lg mb-4">
            {activeCard.statCallout}
          </p>
          <p className="text-sm leading-relaxed text-[#42524A] mb-4">{activeCard.summary}</p>
          <p className="pt-3 border-t border-[#1D2D27]/10 font-serif italic text-sm text-[#8C4A32]">
            “{activeCard.takeaway}”
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg border border-[#1D2D27]/20 text-[#1D2D27] hover:bg-[#EBE6DC] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#1F3A2E]" aria-hidden="true" />
                <span>Copied Story Note</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>Copy Caption</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadPng}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#1F3A2E] text-[#FBF9F5] hover:bg-[#294B3C] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>Downloaded Square PNG</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download Social PNG</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
