import svgPaths from "./svg-sjidmru2sk";
import imgAlbumArtwork from "figma:asset/f7618f4b83c728cd689b8bfe2ffba29e42c52822.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white tracking-[-0.75px] w-full">
        <p className="leading-[36px]">Neon Pulse</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[18px] w-full">
        <p className="leading-[28px] mb-0">Lumina Collective • Synthwave</p>
        <p className="leading-[28px]">Dreams</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start pr-[16px] relative w-full">
        <Heading />
        <Container1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[22.938px] relative shrink-0 w-[25px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 22.9375">
        <g id="Container">
          <path d={svgPaths.p1946a600} fill="var(--fill-0, #3AF9E7)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container2 />
    </div>
  );
}

function TrackMetadata() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Track Metadata">
      <Container />
      <Button />
    </div>
  );
}

function TrackMetadataMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] pb-[32px] pt-[40px] right-[24px] top-[438px]" data-name="Track Metadata:margin">
      <TrackMetadata />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p310f3a00} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[15.923px] relative shrink-0 w-[17.654px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6537 15.9229">
        <g id="Container">
          <path d={svgPaths.pf20a880} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[28px] relative shrink-0 w-[24px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 28">
        <g id="Container">
          <path d={svgPaths.p24adca80} fill="var(--fill-0, #005A53)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shadow-[0px_0px_30px_0px_rgba(58,249,231,0.4)] shrink-0 size-[80px]" data-name="Button" style={{ backgroundImage: "linear-gradient(135deg, rgb(58, 249, 231) 0%, rgb(23, 234, 217) 100%)" }}>
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[15.923px] relative shrink-0 w-[17.654px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6537 15.9229">
        <g id="Container">
          <path d={svgPaths.p1e6ac00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container7 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <g id="Container">
          <path d={svgPaths.p1b69a00} fill="var(--fill-0, #2FF801)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container8 />
    </div>
  );
}

function PlaybackControls() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-between left-[24px] px-[8px] right-[24px] top-[calc(50%+230.5px)]" data-name="Playback Controls">
      <Button1 />
      <Container4 />
      <Button5 />
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Button">
      <div className="h-[16px] relative shrink-0 w-[20px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
          <path d={svgPaths.p172b9974} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] text-center tracking-[-0.5px] uppercase w-[69.94px]">
        <p className="leading-[15px]">Kitchen Echo</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Button">
      <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
          <path d={svgPaths.p2b729200} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] text-center tracking-[-0.5px] uppercase w-[31.64px]">
        <p className="leading-[15px]">Share</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Button">
      <div className="h-[14px] relative shrink-0 w-[19px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 14">
          <path d={svgPaths.p3a370a00} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] text-center tracking-[-0.5px] uppercase w-[35.34px]">
        <p className="leading-[15px]">Add to</p>
      </div>
    </div>
  );
}

function AdditionalActions() {
  return (
    <div className="relative shrink-0 w-full" data-name="Additional Actions">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[68.4px] items-center pl-[34.17px] pr-[34.19px] relative w-full">
          <Button6 />
          <Button7 />
          <Button8 />
        </div>
      </div>
    </div>
  );
}

function AdditionalActionsMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] pt-[48px] right-[24px] top-[760px]" data-name="Additional Actions:margin">
      <AdditionalActions />
    </div>
  );
}

function AlbumArtwork() {
  return (
    <div className="h-[342px] relative shrink-0 w-full" data-name="Album Artwork">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAlbumArtwork} />
      </div>
    </div>
  );
}

function OverlayShadow() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[32px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Overlay+Shadow">
      <AlbumArtwork />
    </div>
  );
}

function AlbumArtworkSection() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[24px] right-[24px] top-[calc(50%-222.5px)]" data-name="Album Artwork Section">
      <div className="absolute bg-[rgba(58,249,231,0.2)] blur-[32px] inset-[-16px] opacity-50" data-name="Dynamic Glow Layer" />
      <OverlayShadow />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#262626] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-gradient-to-r from-[#3af9e7] inset-[0_55%_0_0] rounded-[9999px] to-[#2ff801]" data-name="Gradient" />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] tracking-[1.2px] w-[36.98px]">
        <p className="leading-[16px]">02:14</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] tracking-[1.2px] w-[39.66px]">
        <p className="leading-[16px]">04:45</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between opacity-70 relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function PlaybackProgress() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Playback Progress">
      <Background />
      <Container9 />
    </div>
  );
}

function PlaybackProgressMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] pb-[40px] right-[24px] top-[606px]" data-name="Playback Progress:margin">
      <PlaybackProgress />
    </div>
  );
}

function MainPlayerCanvas() {
  return (
    <div className="h-[979px] max-w-[512px] min-h-[979px] relative shrink-0 w-full" data-name="Main Player Canvas" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 390 979\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(75.298 0 0 75.298 78 293.7)\\'><stop stop-color=\\'rgba(58,249,231,0.15)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(58,249,231,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 390 979\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(75.298 0 0 75.298 312 685.3)\\'><stop stop-color=\\'rgba(47,248,1,0.1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(47,248,1,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(14, 14, 14) 0%, rgb(14, 14, 14) 100%)" }}>
      <TrackMetadataMargin />
      <PlaybackControls />
      <AdditionalActionsMargin />
      <AlbumArtworkSection />
      <PlaybackProgressMargin />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#3af9e7] text-[12px] tracking-[1.2px] uppercase w-[49.7px]">
        <p className="leading-[16px]">Lyrics</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g id="Container">
          <path d={svgPaths.p14eb9c00} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Container13 />
        <Container14 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white w-full">
        <p className="leading-[22.5px]">Walking through the static lines</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-50 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[18px] w-full">
        <p className="leading-[28px]">Feeling like a digital ghost</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative w-full">
        <Container16 />
        <Container17 />
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(19,19,19,0.6)] relative rounded-[32px] shrink-0 w-full" data-name="Overlay+Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="content-stretch flex flex-col gap-[15px] items-start p-[25px] relative w-full">
        <Container12 />
        <Container15 />
      </div>
    </div>
  );
}

function LyricsPreviewBentoLayeredElement() {
  return (
    <div className="absolute bottom-[128px] content-stretch flex flex-col items-start left-[24px] right-[24px]" data-name="Lyrics Preview (Bento/Layered Element)">
      <OverlayBorderOverlayBlur />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[7.4px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7.4">
        <g id="Container">
          <path d={svgPaths.p1adfde00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container19 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#3af9e7] text-[16px] tracking-[-0.4px] w-[91.72px]">
        <p className="leading-[24px]">Now Playing</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Button9 />
      <Container20 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[16px] relative shrink-0 w-[4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 16">
        <g id="Container">
          <path d={svgPaths.p3caf0c80} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container21 />
    </div>
  );
}

function HeaderTopNavigationAnchorSharedComponent() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#0e0e0e] items-center justify-between left-0 px-[24px] py-[16px] to-[rgba(14,14,14,0)] top-0 w-[390px]" data-name="Header - Top Navigation Anchor (Shared Component)">
      <Container18 />
      <Button10 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 18">
        <g id="Container">
          <path d={svgPaths.p12a32500} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] tracking-[1px] uppercase w-[34.13px]">
        <p className="leading-[15px]">Home</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link">
      <Container22 />
      <Margin />
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] tracking-[1px] uppercase w-[46.5px]">
        <p className="leading-[15px]">Search</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link">
      <Container23 />
      <Margin1 />
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p99bf1b4} fill="var(--fill-0, #3AF9E7)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#3af9e7] text-[10px] tracking-[1px] uppercase w-[49.7px]">
        <p className="leading-[15px]">Library</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link">
      <Container24 />
      <Margin2 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[21px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 21">
        <g id="Container">
          <path d={svgPaths.p1c671000} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] tracking-[1px] uppercase w-[54.03px]">
        <p className="leading-[15px]">Premium</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link">
      <Container25 />
      <Margin3 />
    </div>
  );
}

function BottomNavigationSharedComponent() {
  return (
    <div className="absolute backdrop-blur-[8px] bg-[rgba(19,19,19,0.8)] bottom-0 content-stretch flex gap-[43.4px] items-center left-0 pb-[32px] pl-[37.7px] pr-[37.72px] pt-[12px] rounded-tl-[32px] rounded-tr-[32px] shadow-[0px_-10px_30px_0px_rgba(0,0,0,0.5)] w-[390px]" data-name="Bottom Navigation (Shared Component)">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

export default function MaxLinifyPlayerScreen() {
  return (
    <div className="bg-[#0e0e0e] content-stretch flex flex-col items-start relative size-full" data-name="MaxLinify - Player Screen">
      <MainPlayerCanvas />
      <LyricsPreviewBentoLayeredElement />
      <HeaderTopNavigationAnchorSharedComponent />
      <BottomNavigationSharedComponent />
    </div>
  );
}