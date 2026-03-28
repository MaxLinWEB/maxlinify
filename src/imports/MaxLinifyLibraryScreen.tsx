import svgPaths from "./svg-33qc804a5c";
import imgGenres from "figma:asset/cc9290e5fe0a3e00ac87cce9fa9ac1ee57b459c3.png";
import imgMoods from "figma:asset/3c8ac4b095abd41ea898708ddb9c16a7236e3adb.png";
import imgPodcasts from "figma:asset/cecd1186f01600780d60e1bb47d6c801707fea19.png";
import imgLiveEvents from "figma:asset/10ef3b67a094d3246d5ffe6b8c9ab70606093b32.png";
import imgLikedSongs from "figma:asset/154e7bd2fbf7f14decf9c7edfa0159ef7744826c.png";
import imgTechnoPulse from "figma:asset/ed2fd2791cc2feba5c9bf5987d5afcb16344b869.png";
import imgAfterHours from "figma:asset/e0ad504700ae3afbbb2576cedafc0c7d63383ae7.png";
import imgDailyMix1 from "figma:asset/5c8f6d37f3efde9c5a6ff96e2b26f722213df665.png";
import imgNowPlaying from "figma:asset/dafa81c78f8db393b2e38534646b94497c5713c1.png";
import imgUserProfilePhoto from "figma:asset/7b2e6a06b84735d98d0bbfb479b9fded0d586bff.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-white tracking-[-0.9px] w-full">
        <p className="leading-[40px]">Search</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[16px] w-full">
        <p className="leading-[normal]">Artists, songs, or podcasts</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#262626] relative rounded-[9999px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[48px] pr-[24px] py-[18px] relative w-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
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

function Container2() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-[16px] top-0" data-name="Container">
      <Container3 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container2 />
    </div>
  );
}

function SearchSection() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Search Section">
      <Heading />
      <Container />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[24px] text-white w-[122.64px]">
        <p className="leading-[32px]">Browse All</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#3af9e7] text-[14px] text-center w-[46.7px]">
        <p className="leading-[20px]">See All</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Button />
    </div>
  );
}

function Genres() {
  return (
    <div className="absolute inset-0 mix-blend-overlay" data-name="Genres">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[145.54%] left-0 max-w-none top-[-22.77%] w-full" src={imgGenres} />
      </div>
    </div>
  );
}

function CategoryCard() {
  return (
    <div className="col-1 h-[112px] justify-self-stretch overflow-clip relative rounded-[32px] row-1 shrink-0" data-name="Category Card 1">
      <div className="absolute inset-0 opacity-90" data-name="Gradient" style={{ backgroundImage: "linear-gradient(145.506deg, rgb(147, 51, 234) 0%, rgb(49, 46, 129) 100%)" }} />
      <Genres />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] left-[16px] text-[18px] text-white top-[30px] w-[63.23px]">
        <p className="leading-[28px]">Genres</p>
      </div>
    </div>
  );
}

function Moods() {
  return (
    <div className="absolute inset-0 mix-blend-overlay" data-name="Moods">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[145.54%] left-0 max-w-none top-[-22.77%] w-full" src={imgMoods} />
      </div>
    </div>
  );
}

function CategoryCard1() {
  return (
    <div className="col-2 h-[112px] justify-self-stretch overflow-clip relative rounded-[32px] row-1 shrink-0" data-name="Category Card 2">
      <div className="absolute inset-0 opacity-90" data-name="Gradient" style={{ backgroundImage: "linear-gradient(145.506deg, rgb(16, 185, 129) 0%, rgb(17, 94, 89) 100%)" }} />
      <Moods />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] left-[16px] text-[18px] text-white top-[30px] w-[60.91px]">
        <p className="leading-[28px]">Moods</p>
      </div>
    </div>
  );
}

function Podcasts() {
  return (
    <div className="absolute inset-0 mix-blend-overlay" data-name="Podcasts">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[145.54%] left-0 max-w-none top-[-22.77%] w-full" src={imgPodcasts} />
      </div>
    </div>
  );
}

function CategoryCard2() {
  return (
    <div className="col-1 h-[112px] justify-self-stretch overflow-clip relative rounded-[32px] row-2 shrink-0" data-name="Category Card 3">
      <div className="absolute inset-0 opacity-90" data-name="Gradient" style={{ backgroundImage: "linear-gradient(145.506deg, rgb(249, 115, 22) 0%, rgb(185, 28, 28) 100%)" }} />
      <Podcasts />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] left-[16px] text-[18px] text-white top-[30px] w-[82.42px]">
        <p className="leading-[28px]">Podcasts</p>
      </div>
    </div>
  );
}

function LiveEvents() {
  return (
    <div className="absolute inset-0 mix-blend-overlay" data-name="Live Events">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[145.54%] left-0 max-w-none top-[-22.77%] w-full" src={imgLiveEvents} />
      </div>
    </div>
  );
}

function CategoryCard3() {
  return (
    <div className="col-2 h-[112px] justify-self-stretch overflow-clip relative rounded-[32px] row-2 shrink-0" data-name="Category Card 4">
      <div className="absolute inset-0 opacity-90" data-name="Gradient" style={{ backgroundImage: "linear-gradient(145.506deg, rgb(37, 99, 235) 0%, rgb(22, 78, 99) 100%)" }} />
      <LiveEvents />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] left-[16px] text-[18px] text-white top-[30px] w-[77.88px]">
        <p className="leading-[28px]">New Hits</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__112px_112px] relative shrink-0 w-full" data-name="Container">
      <CategoryCard />
      <CategoryCard1 />
      <CategoryCard2 />
      <CategoryCard3 />
    </div>
  );
}

function SectionCategoriesBrowseAll() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section - Categories / Browse All">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Button1() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#3af9e7] content-stretch flex flex-col items-center justify-center left-0 px-[24px] py-[8px] rounded-[9999px] top-1/2" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#005a53] text-[16px] text-center w-[64.38px]">
        <p className="leading-[24px]">Playlists</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#262626] content-stretch flex flex-col items-center justify-center left-[128.38px] px-[24px] py-[8px] rounded-[9999px] top-1/2" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[16px] text-center w-[58.81px]">
        <p className="leading-[24px]">Albums</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#262626] content-stretch flex flex-col items-center justify-center left-[251.19px] px-[24px] py-[8px] rounded-[9999px] top-1/2" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[16px] text-center w-[51.22px]">
        <p className="leading-[24px]">Artists</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#262626] content-stretch flex flex-col items-center justify-center left-[366.41px] px-[24px] py-[8px] rounded-[9999px] top-1/2" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[16px] text-center w-[96.98px]">
        <p className="leading-[24px]">Downloaded</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[40px] left-0 overflow-clip right-0 top-0" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[72px]" data-name="Heading 2">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[24px] text-white w-[137.91px]">
        <p className="leading-[32px]">Your Library</p>
      </div>
    </div>
  );
}

function LikedSongs() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Liked Songs">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgLikedSongs} />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[18.35px] relative w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 18.35">
        <g id="Container">
          <path d={svgPaths.p2628ad80} fill="var(--fill-0, #3AF9E7)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.2)] content-stretch flex inset-0 items-center justify-center" data-name="Overlay">
      <div className="flex h-[27.525px] items-center justify-center relative shrink-0 w-[30px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none scale-x-150 scale-y-150">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function OverlayShadow() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[6px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 size-[96px]" data-name="Overlay+Shadow">
      <LikedSongs />
      <Overlay />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[28px]">Liked Songs</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[10px] relative shrink-0 w-[6px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 10">
        <g id="Container">
          <path d={svgPaths.p3bfca000} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[14px] w-[98.4px]">
        <p className="leading-[20px] mb-0">Playlist • 1,284</p>
        <p className="leading-[20px]">songs</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3.5px] items-start min-h-px min-w-px relative" data-name="Container">
      <Heading3 />
      <Container10 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[2px] h-[16px] items-end relative shrink-0" data-name="Container">
      <div className="bg-[#2ff801] h-full rounded-[9999px] shrink-0 w-[4px]" data-name="Background" />
      <div className="bg-[#2ff801] h-[10.66px] rounded-[9999px] shrink-0 w-[4px]" data-name="Background" />
      <div className="bg-[#2ff801] h-[13.33px] rounded-[9999px] shrink-0 w-[4px]" data-name="Background" />
      <div className="bg-[#2ff801] h-[8px] rounded-[9999px] shrink-0 w-[4px]" data-name="Background" />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <Container13 />
    </div>
  );
}

function FeaturedLibraryItemLargeCard() {
  return (
    <div className="bg-[#131313] relative rounded-[32px] shrink-0 w-full" data-name="Featured Library Item (Large Card)">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[20px] items-center p-[16px] relative w-full">
          <OverlayShadow />
          <Container9 />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function TechnoPulse() {
  return (
    <div className="max-w-[342px] relative rounded-[6px] shrink-0 size-[64px]" data-name="Techno Pulse">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[6px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgTechnoPulse} />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
          <p className="leading-[24px]">Techno Pulse</p>
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] w-full">
          <p className="leading-[16px]">Playlist • MaxLinify</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px pb-[9px] relative" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(72,72,71,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Heading4 />
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[16px] relative shrink-0 w-[4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 16">
        <g id="Container">
          <path d={svgPaths.p3caf0c80} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Item() {
  return (
    <div className="col-1 h-[80px] justify-self-stretch relative rounded-[32px] row-1 shrink-0" data-name="Item 2">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[8px] relative size-full">
          <TechnoPulse />
          <HorizontalBorder />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function AfterHours() {
  return (
    <div className="max-w-[342px] relative rounded-[6px] shrink-0 size-[64px]" data-name="After Hours">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[6px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAfterHours} />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
          <p className="leading-[24px]">After Hours</p>
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] w-full">
          <p className="leading-[16px]">Album • The Weeknd</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px pb-[9px] relative" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(72,72,71,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Heading5 />
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[16px] relative shrink-0 w-[4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 16">
        <g id="Container">
          <path d={svgPaths.p3caf0c80} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Item1() {
  return (
    <div className="col-1 h-[80px] justify-self-stretch relative rounded-[32px] row-2 shrink-0" data-name="Item 3">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[8px] relative size-full">
          <AfterHours />
          <HorizontalBorder1 />
          <Container17 />
        </div>
      </div>
    </div>
  );
}

function DailyMix() {
  return (
    <div className="max-w-[342px] relative rounded-[6px] shrink-0 size-[64px]" data-name="Daily Mix 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[6px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgDailyMix1} />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
          <p className="leading-[24px]">Daily Mix 1</p>
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] w-full">
          <p className="leading-[16px]">Playlist • Made for you</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px pb-[9px] relative" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(72,72,71,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Heading6 />
      <Container18 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[16px] relative shrink-0 w-[4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 16">
        <g id="Container">
          <path d={svgPaths.p3caf0c80} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Item2() {
  return (
    <div className="col-1 h-[80px] justify-self-stretch relative rounded-[32px] row-3 shrink-0" data-name="Item 4">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[8px] relative size-full">
          <DailyMix />
          <HorizontalBorder2 />
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function BentoStyleGridForSmallerItems() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[___80px_80px_80px] relative shrink-0 w-full" data-name="Bento Style Grid for Smaller Items">
      <Item />
      <Item1 />
      <Item2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-0 right-0 top-[128px]" data-name="Container">
      <FeaturedLibraryItemLargeCard />
      <BentoStyleGridForSmallerItems />
    </div>
  );
}

function YourLibrarySectionBentoInspired() {
  return (
    <div className="h-[560px] relative shrink-0 w-full" data-name="Your Library Section (Bento Inspired)">
      <Container6 />
      <Heading2 />
      <Container7 />
    </div>
  );
}

function Main() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[40px] items-start pb-[160px] pt-[96px] px-[24px] relative w-full">
        <SearchSection />
        <SectionCategoriesBrowseAll />
        <YourLibrarySectionBentoInspired />
      </div>
    </div>
  );
}

function NowPlaying() {
  return (
    <div className="max-w-[358px] relative rounded-[9999px] shrink-0 size-[40px]" data-name="Now Playing">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgNowPlaying} />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
        <p className="leading-[16px]">Cybernetic Dreams</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] w-full">
        <p className="leading-[15px]">Neon Architect</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Heading7 />
        <Container21 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="Container">
          <path d={svgPaths.p172b9974} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container23 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[14px] relative shrink-0 w-[11px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
        <g id="Container">
          <path d="M0 14V0L11 7L0 14V14" fill="var(--fill-0, black)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Button">
      <Container24 />
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pr-[8px] relative">
        <Button5 />
        <Button6 />
      </div>
    </div>
  );
}

function MiniPlayerFloatingGlassmorphism() {
  return (
    <div className="absolute backdrop-blur-[12px] bg-[rgba(19,19,19,0.8)] bottom-[96px] content-stretch flex gap-[12px] items-center left-[16px] p-[9px] right-[16px] rounded-[9999px]" data-name="Mini Player (Floating Glassmorphism)">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.4)]" />
      <NowPlaying />
      <Container20 />
      <Container22 />
    </div>
  );
}

function UserProfilePhoto() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="User profile photo">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUserProfilePhoto} />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[40px]" data-name="Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <UserProfilePhoto />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(58,249,231,0.2)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Extra_Bold_Italic',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#3af9e7] text-[24px] tracking-[-1.2px] w-[101.13px]">
        <p className="leading-[32px]">MaxLinify</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Border />
      <Container27 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
        <g id="Container">
          <path d={svgPaths.p3cdadd00} fill="var(--fill-0, #3AF9E7)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container28 />
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[16px] relative w-full">
          <Container26 />
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="absolute backdrop-blur-[12px] content-stretch flex flex-col items-start left-0 top-0 w-[390px]" data-name="Header - Top App Bar" style={{ backgroundImage: "linear-gradient(rgb(14, 14, 14) 0%, rgba(14, 14, 14, 0) 100%), linear-gradient(90deg, rgba(14, 14, 14, 0.7) 0%, rgba(14, 14, 14, 0.7) 100%)" }}>
      <Container25 />
    </div>
  );
}

function Container30() {
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

function LinkHome() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link - Home">
      <Container30 />
      <Margin />
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #3AF9E7)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#3af9e7] text-[10px] tracking-[1px] uppercase w-[47.53px]">
        <p className="leading-[15px]">Search</p>
      </div>
    </div>
  );
}

function LinkSearchActiveMappingToSearchExploreIntent() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link - Search (Active - Mapping to Search/Explore intent)">
      <Container31 />
      <Margin1 />
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p376b6540} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] tracking-[1px] uppercase w-[48.2px]">
        <p className="leading-[15px]">Library</p>
      </div>
    </div>
  );
}

function LinkLibraryAlsoProminentHereButSearchIsPrimaryIntentOfUiRequest() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link - Library (Also prominent here but Search is primary intent of UI request)">
      <Container32 />
      <Margin2 />
    </div>
  );
}

function Container33() {
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

function LinkPremium() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link - Premium">
      <Container33 />
      <Margin3 />
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[43.5px] items-center pb-[32px] pl-[37.75px] pr-[37.81px] pt-[12px] relative w-full">
          <LinkHome />
          <LinkSearchActiveMappingToSearchExploreIntent />
          <LinkLibraryAlsoProminentHereButSearchIsPrimaryIntentOfUiRequest />
          <LinkPremium />
        </div>
      </div>
    </div>
  );
}

function BottomNavigationBar() {
  return (
    <div className="absolute backdrop-blur-[8px] bg-[rgba(19,19,19,0.8)] bottom-0 content-stretch flex flex-col items-start left-0 rounded-tl-[32px] rounded-tr-[32px] shadow-[0px_-10px_30px_0px_rgba(0,0,0,0.5)] w-[390px]" data-name="Bottom Navigation Bar">
      <Container29 />
    </div>
  );
}

export default function MaxLinifyLibraryScreen() {
  return (
    <div className="bg-[#0e0e0e] content-stretch flex flex-col items-start relative size-full" data-name="MaxLinify - Library Screen">
      <Main />
      <MiniPlayerFloatingGlassmorphism />
      <HeaderTopAppBar />
      <BottomNavigationBar />
    </div>
  );
}