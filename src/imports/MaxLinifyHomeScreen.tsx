import svgPaths from "./svg-0ws1oxd8lg";
import imgFeaturedPlaylist from "figma:asset/5ca80e82823bf9531a84296107ea788e9b4ae244.png";
import imgSoulSessions from "figma:asset/3e518d173ab6921e86cee7290fba2fca28654555.png";
import imgMidnightRave from "figma:asset/885273e7e9b84061200dd12e00153d3af1f9ff8b.png";
import imgLoFiBeats from "figma:asset/09f1006d56ca738557d3fbcba668c8795a5b567d.png";
import imgModernJazz from "figma:asset/832999fface0889a2d3395f01f32d48ea18d6d05.png";
import imgElectronicHits from "figma:asset/bca4e37e60659dc2741756e0f8ada31a5b4a6701.png";
import imgArtist1 from "figma:asset/2f71927052d3f161efe2fc72a97ea8e70aa2273d.png";
import imgArtist2 from "figma:asset/38358840cdac4d0e9b88db2a02d08f54487c8392.png";
import imgArtist3 from "figma:asset/553475d46c989856b8cd04ac357408f87a72740b.png";
import imgArtist4 from "figma:asset/e8782826383e466be1ac64e94fff13c1382be97e.png";
import imgArtist5 from "figma:asset/d95dea049a6294dce8b0a2ed34eb6e02db197d1d.png";
import imgMix1 from "figma:asset/7a2b988ddf6f035f19267befea55369245cd0749.png";
import imgMix2 from "figma:asset/ae15f3c110d400c31008087ccde1b830718dc4ba.png";
import imgMaxLinifyLogo from "figma:asset/11d3c7cfd916f92a90f96ac8a0e05dc49b7473d6.png";
import imgNowPlaying from "figma:asset/d48db9610e11d2f4a2c34c61254f593ccb6be9f7.png";

function FeaturedPlaylist() {
  return (
    <div className="relative size-full" data-name="Featured Playlist">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[168%] left-[-2.5%] max-w-none top-[-34%] w-[105%]" src={imgFeaturedPlaylist} />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2ff801] text-[12px] tracking-[2.4px] uppercase w-[111.3px]">
        <p className="leading-[16px]">New Release</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Extra_Bold',sans-serif] h-[90px] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-white tracking-[-1.8px] w-[177.02px]">
        <p className="leading-[45px] mb-0">Neon Pulse</p>
        <p className="leading-[45px]">Anthology</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[14px] relative shrink-0 w-[11px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
        <g id="Container">
          <path d="M0 14V0L11 7L0 14V14" fill="var(--fill-0, #005A53)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[32px] py-[12px] relative rounded-[9999px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(132.699deg, rgb(58, 249, 231) 0%, rgb(23, 234, 217) 100%)" }}>
      <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_-0.02px_0_0] rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(58,249,231,0.2),0px_4px_6px_-4px_rgba(58,249,231,0.2)]" data-name="Button:shadow" />
      <Container3 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#005a53] text-[16px] text-center w-[72.53px]">
        <p className="leading-[24px]">Play Now</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p2bb32400} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[48px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container4 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center pt-[8px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col gap-[8px] items-start left-0 p-[32px] w-[283.53px]" data-name="Container">
      <Container1 />
      <Heading />
      <Container2 />
    </div>
  );
}

function HeroSectionEditorialPlaylist() {
  return (
    <div className="h-[213.75px] overflow-clip relative rounded-[32px] shrink-0 w-full" data-name="Hero Section: Editorial Playlist">
      <div className="absolute aspect-[359.0999836921692/224.43998919714068] flex items-center justify-center left-[-8.55px] right-[-8.55px] top-[-5.34px]">
        <div className="flex-none h-[224.44px] w-[359.1px]">
          <FeaturedPlaylist />
        </div>
      </div>
      <div className="absolute bg-gradient-to-t from-[#0e0e0e] inset-0 to-[rgba(14,14,14,0)] via-1/2 via-[rgba(14,14,14,0.4)]" data-name="Gradient" />
      <Container />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[24px] text-white tracking-[-0.6px] w-[142.09px]">
        <p className="leading-[32px]">Jump back in</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#3af9e7] text-[14px] text-center tracking-[0.35px] w-[58.45px]">
        <p className="leading-[20px]">View All</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Button2 />
    </div>
  );
}

function SoulSessions() {
  return (
    <div className="h-[131px] relative shrink-0 w-full" data-name="Soul Sessions">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSoulSessions} />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <SoulSessions />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[12px] relative shrink-0 w-full" data-name="Margin">
      <Container7 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[95.7px]">
        <p className="leading-[20px]">Soul Sessions</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#20201f] col-1 justify-self-stretch relative rounded-[32px] row-3 self-start shrink-0" data-name="Background">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[16px] relative w-full">
          <Margin />
          <Heading3 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] text-center w-[54.64px]">
            <p className="leading-[16px]">Ariel Vibe</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MidnightRave() {
  return (
    <div className="h-[131px] relative shrink-0 w-full" data-name="Midnight Rave">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMidnightRave} />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <MidnightRave />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[12px] relative shrink-0 w-full" data-name="Margin">
      <Container8 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[97.67px]">
        <p className="leading-[20px]">Midnight Rave</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#20201f] col-2 justify-self-stretch relative rounded-[32px] row-3 self-start shrink-0" data-name="Background">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[16px] relative w-full">
          <Margin1 />
          <Heading4 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] text-center w-[55.97px]">
            <p className="leading-[16px]">Collective</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoFiBeats() {
  return (
    <div className="h-[131px] relative shrink-0 w-full" data-name="Lo-fi Beats">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgLoFiBeats} />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <LoFiBeats />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[12px] relative shrink-0 w-full" data-name="Margin">
      <Container9 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[74.59px]">
        <p className="leading-[20px]">Lo-fi Beats</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#20201f] col-1 justify-self-stretch relative rounded-[32px] row-4 self-start shrink-0" data-name="Background">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[16px] relative w-full">
          <Margin2 />
          <Heading5 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] text-center w-[88.58px]">
            <p className="leading-[16px]">Coffee Morning</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModernJazz() {
  return (
    <div className="h-[131px] relative shrink-0 w-full" data-name="Modern Jazz">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgModernJazz} />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <ModernJazz />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[12px] relative shrink-0 w-full" data-name="Margin">
      <Container10 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[88.98px]">
        <p className="leading-[20px]">Modern Jazz</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#20201f] col-2 justify-self-stretch relative rounded-[32px] row-4 self-start shrink-0" data-name="Background">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[16px] relative w-full">
          <Margin3 />
          <Heading6 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] text-center w-[74.7px]">
            <p className="leading-[16px]">Night Quintet</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ElectronicHits() {
  return (
    <div className="absolute inset-0 opacity-40" data-name="Electronic Hits">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[208.54%] left-0 max-w-none top-[-54.27%] w-full" src={imgElectronicHits} />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] w-full">
        <p className="leading-[16px]">Playlist</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-white w-full">
        <p className="leading-[32px]">Ultra Bass FM</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[14px] relative shrink-0 w-[11px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
        <g id="Container">
          <path d="M0 14V0L11 7L0 14V14" fill="var(--fill-0, #005A53)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#3af9e7] content-stretch flex items-center justify-center opacity-0 relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[9999px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] size-[48px] top-0" data-name="Overlay+Shadow" />
      <Container13 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Heading2 />
      <Background5 />
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#131313] col-[1/span_2] justify-self-stretch relative rounded-[32px] row-[1/span_2] self-start shrink-0" data-name="Background">
      <div className="flex flex-col justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-end pb-[8px] pt-[24px] px-[24px] relative w-full">
          <ElectronicHits />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[____74px_74px_211px_211px] relative shrink-0 w-full" data-name="Container">
      <Background />
      <Background1 />
      <Background2 />
      <Background3 />
      <Background4 />
    </div>
  );
}

function SectionRecentlyPlayedBentoGridStyle() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section - Recently Played: Bento Grid Style">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-white tracking-[-0.6px] w-full">
        <p className="leading-[32px]">Top Artists</p>
      </div>
    </div>
  );
}

function Artist() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[9999px] w-full" data-name="Artist 1">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgArtist1} />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center p-[6px] relative rounded-[9999px] shrink-0 size-[96px]" data-name="Border">
      <div aria-hidden="true" className="absolute border-2 border-[#3af9e7] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Artist />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[66.77px]">
        <p className="leading-[20px]">Zade Flux</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col gap-[12px] items-center left-0 top-0" data-name="Container">
      <Border />
      <Container16 />
    </div>
  );
}

function Artist1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[9999px] w-full" data-name="Artist 2">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgArtist2} />
      </div>
    </div>
  );
}

function Border1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center p-[6px] relative rounded-[9999px] shrink-0 size-[96px]" data-name="Border">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Artist1 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[70.72px]">
        <p className="leading-[20px]">Luna Skye</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col gap-[12px] items-center left-[120px] top-0" data-name="Container">
      <Border1 />
      <Container18 />
    </div>
  );
}

function Artist2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[9999px] w-full" data-name="Artist 3">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgArtist3} />
      </div>
    </div>
  );
}

function Border2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center p-[6px] relative rounded-[9999px] shrink-0 size-[96px]" data-name="Border">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Artist2 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[87.03px]">
        <p className="leading-[20px]">Marcus Grey</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col gap-[12px] items-center left-[240px] top-0" data-name="Container">
      <Border2 />
      <Container20 />
    </div>
  );
}

function Artist3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[9999px] w-full" data-name="Artist 4">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgArtist4} />
      </div>
    </div>
  );
}

function Border3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center p-[6px] relative rounded-[9999px] shrink-0 size-[96px]" data-name="Border">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Artist3 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[65.5px]">
        <p className="leading-[20px]">Elias Blue</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col gap-[12px] items-center left-[360px] top-0" data-name="Container">
      <Border3 />
      <Container22 />
    </div>
  );
}

function Artist4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[9999px] w-full" data-name="Artist 5">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgArtist5} />
      </div>
    </div>
  );
}

function Border4() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center p-[6px] relative rounded-[9999px] shrink-0 size-[96px]" data-name="Border">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Artist4 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[65.58px]">
        <p className="leading-[20px]">Synthetix</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col gap-[12px] items-center left-[480px] top-0" data-name="Container">
      <Border4 />
      <Container24 />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[144px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container17 />
      <Container19 />
      <Container21 />
      <Container23 />
    </div>
  );
}

function SectionTopArtistsCircularLayout() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pt-[8px] relative shrink-0 w-full" data-name="Section - Top Artists: Circular Layout">
      <Heading7 />
      <Container14 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-white tracking-[-0.6px] w-full">
        <p className="leading-[32px]">Made for you</p>
      </div>
    </div>
  );
}

function Mix() {
  return (
    <div className="absolute inset-0 opacity-60" data-name="Mix 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMix1} />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[22.938px] relative shrink-0 w-[25px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 22.9375">
        <g id="Container">
          <path d={svgPaths.p1946a600} fill="var(--fill-0, #005A53)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background6() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[64px]" data-name="Background" style={{ backgroundImage: "linear-gradient(135deg, rgb(58, 249, 231) 0%, rgb(47, 248, 1) 100%)" }}>
      <Mix />
      <Container26 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[24px]">Daily Mix 1</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[14px] w-full">
        <p className="leading-[20px] mb-0">Zade Flux, Luna Skye, and</p>
        <p className="leading-[20px]">more</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Heading9 />
      <Container28 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[2px] items-end relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-[#2ff801] h-full shrink-0 w-[2px]" data-name="Vertical Divider" />
      <div className="bg-[#2ff801] h-[10.66px] shrink-0 w-[2px]" data-name="Vertical Divider" />
      <div className="bg-[#2ff801] h-[8px] shrink-0 w-[2px]" data-name="Vertical Divider" />
    </div>
  );
}

function OverlayOverlayBlur() {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(19,19,19,0.8)] relative rounded-[32px] shrink-0 w-full" data-name="Overlay+OverlayBlur">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[20px] relative w-full">
          <Background6 />
          <Container27 />
          <Container29 />
        </div>
      </div>
    </div>
  );
}

function Mix1() {
  return (
    <div className="absolute inset-0 opacity-60" data-name="Mix 2">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMix2} />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[25px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 25">
        <g id="Container">
          <path d={svgPaths.p2c190838} fill="var(--fill-0, #005A53)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background7() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[64px]" data-name="Background" style={{ backgroundImage: "linear-gradient(135deg, rgb(105, 200, 255) 0%, rgb(58, 249, 231) 100%)" }}>
      <Mix1 />
      <Container30 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[24px]">Discovery Weekly</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[14px] w-full">
        <p className="leading-[20px] mb-0">New sounds for your</p>
        <p className="leading-[20px]">Monday</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Heading10 />
      <Container32 />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function OverlayOverlayBlur1() {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(19,19,19,0.8)] relative rounded-[32px] shrink-0 w-full" data-name="Overlay+OverlayBlur">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[20px] relative w-full">
          <Background7 />
          <Container31 />
          <Container33 />
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <OverlayOverlayBlur />
      <OverlayOverlayBlur1 />
    </div>
  );
}

function SectionPersonalMixesGlassCards() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pt-[8px] relative shrink-0 w-full" data-name="Section - Personal Mixes: Glass Cards">
      <Heading8 />
      <Container25 />
    </div>
  );
}

function Main() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[40px] items-start pb-[176px] pt-[96px] px-[24px] relative w-full">
        <HeroSectionEditorialPlaylist />
        <SectionRecentlyPlayedBentoGridStyle />
        <SectionTopArtistsCircularLayout />
        <SectionPersonalMixesGlassCards />
      </div>
    </div>
  );
}

function MaxLinifyLogo() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[32px]" data-name="MaxLinify Logo">
      <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMaxLinifyLogo} />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(58,249,231,0.2)] border-solid inset-0 rounded-[9999px]" />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Extra_Bold_Italic',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#3af9e7] text-[24px] tracking-[-1.2px] w-[103.33px]">
        <p className="leading-[32px]">MaxLinify</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <MaxLinifyLogo />
      <Container35 />
    </div>
  );
}

function Container37() {
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

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Button">
      <Container37 />
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
        <g id="Container">
          <path d={svgPaths.p3cdadd00} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Button">
      <Container38 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Button3 />
      <Button4 />
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="absolute backdrop-blur-[12px] content-stretch flex items-center justify-between left-0 px-[24px] py-[16px] top-0 w-[390px]" data-name="Header - Top App Bar" style={{ backgroundImage: "linear-gradient(rgb(14, 14, 14) 0%, rgba(14, 14, 14, 0) 100%), linear-gradient(90deg, rgba(14, 14, 14, 0.7) 0%, rgba(14, 14, 14, 0.7) 100%)" }}>
      <Container34 />
      <Container36 />
    </div>
  );
}

function NowPlaying() {
  return (
    <div className="max-w-[358px] relative rounded-[16px] shrink-0 size-[48px]" data-name="Now Playing">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgNowPlaying} />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-full">
        <p className="leading-[20px]">Velocity Echo</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#2ff801] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[15px] mb-0">Zade Flux •</p>
        <p className="leading-[15px]">Digital Dreams</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Heading11 />
        <Container40 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[12px] relative shrink-0 w-[13px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 12">
        <g id="Container">
          <path d={svgPaths.p2ee7f2e0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[40px]" data-name="Button">
      <Container42 />
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[14px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
        <g id="Container">
          <path d={svgPaths.p35528880} fill="var(--fill-0, #005A53)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#3af9e7] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Button">
      <div className="-translate-y-1/2 absolute bg-[rgba(255,255,255,0)] left-0 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[40px] top-1/2" data-name="Button:shadow" />
      <Container43 />
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[12px] relative shrink-0 w-[13px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 12">
        <g id="Container">
          <path d={svgPaths.p6f94780} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[40px]" data-name="Button">
      <Container44 />
    </div>
  );
}

function Container41() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <Button5 />
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function MiniPlayer() {
  return (
    <div className="absolute backdrop-blur-[10px] bg-[rgba(19,19,19,0.8)] bottom-[96px] content-stretch flex gap-[16px] items-center left-[16px] p-[13px] right-[16px] rounded-[32px]" data-name="Mini Player">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[32px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" data-name="Mini Player:shadow" />
      <NowPlaying />
      <Container39 />
      <Container41 />
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 18">
        <g id="Container">
          <path d={svgPaths.p1820480} fill="var(--fill-0, #3AF9E7)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#3af9e7] text-[10px] tracking-[1px] uppercase w-[34.58px]">
        <p className="leading-[15px]">Home</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link">
      <Container45 />
      <Margin4 />
    </div>
  );
}

function Container46() {
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

function Margin5() {
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
      <Container46 />
      <Margin5 />
    </div>
  );
}

function Container47() {
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

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] tracking-[1px] uppercase w-[48.2px]">
        <p className="leading-[15px]">Library</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link">
      <Container47 />
      <Margin6 />
    </div>
  );
}

function Container48() {
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

function Margin7() {
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
      <Container48 />
      <Margin7 />
    </div>
  );
}

function BottomNavigationBar() {
  return (
    <div className="absolute backdrop-blur-[8px] bg-[rgba(19,19,19,0.8)] bottom-0 content-stretch flex gap-[43.7px] items-center left-0 pb-[32px] pl-[37.83px] pr-[37.84px] pt-[12px] rounded-tl-[32px] rounded-tr-[32px] shadow-[0px_-10px_30px_0px_rgba(0,0,0,0.5)] w-[390px]" data-name="Bottom Navigation Bar">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

export default function MaxLinifyHomeScreen() {
  return (
    <div className="bg-[#0e0e0e] content-stretch flex flex-col items-start relative size-full" data-name="MaxLinify - Home Screen">
      <Main />
      <HeaderTopAppBar />
      <MiniPlayer />
      <BottomNavigationBar />
    </div>
  );
}