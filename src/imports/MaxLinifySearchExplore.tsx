import svgPaths from "./svg-kbszj85m43";
import imgArtistThumbnail from "figma:asset/01f70a6d0935b1e96590b9a37f8f8053b79a9341.png";
import imgArtistThumbnail1 from "figma:asset/0547279d628bd9b44a2e7158ea46b880e382ea61.png";
import imgElectronicCategory from "figma:asset/49b9588bfede477179696e2891d2d2d13db6b79e.png";
import imgSynthwaveCategory from "figma:asset/7a81c69261dabceee8210660d27575bdacad3116.png";
import imgLoFiCategory from "figma:asset/4df1c8bc776e1d4c9ddeaba9ec95b04d5efb72f6.png";
import imgRockCategory from "figma:asset/8f399af8bdd47277afcf2332d11b833ac4e81250.png";
import imgHipHopCategory from "figma:asset/a33b79ed468df69b40bb48d2c019891762bf852e.png";
import imgPodcastsCategory from "figma:asset/eb7ceadfa3414d0ec97e051454da23bbf18770e1.png";
import imgNewReleasesCategory from "figma:asset/b1e3609269d924c2da0ae06d72ac049fc02603a9.png";
import imgCurrentTrack from "figma:asset/f561a06366acee8ac27b3123517b008fedfd37f2.png";
import imgUserProfilePhoto from "figma:asset/a9a525f43d5cbde9c2d9ac2fe8ca28e5ae16c346.png";

function Container() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[18px] w-full">
        <p className="leading-[normal]">Artists, songs, or podcasts</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#262626] relative rounded-[9999px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[24px] pl-[56px] pr-[24px] pt-[23px] relative w-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Container2() {
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

function Container1() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-[20px] top-0" data-name="Container">
      <Container2 />
    </div>
  );
}

function SearchBarSection() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Search Bar Section">
      <Input />
      <Container1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[20px] text-white tracking-[-0.5px] w-[156.2px]">
        <p className="leading-[28px]">Recent Searches</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#3af9e7] text-[14px] text-center w-[54.89px]">
        <p className="leading-[20px]">Clear all</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Button />
    </div>
  );
}

function ArtistThumbnail() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[40px]" data-name="Artist thumbnail">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgArtistThumbnail} />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[133.34px]">
        <p className="leading-[17.5px]">Synthwave Afterlife</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] w-[40.02px]">
        <p className="leading-[16px]">Playlist</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[133.34px]" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Margin() {
  return (
    <div className="h-[8.167px] relative shrink-0 w-[16.167px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.1667 8.16667">
        <g id="Margin">
          <path d={svgPaths.p1332ccc0} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function SearchItem() {
  return (
    <div className="absolute bg-[#131313] bottom-[8px] content-stretch flex gap-[12px] items-center left-0 pl-[8px] pr-[16px] py-[8px] rounded-[9999px] top-0" data-name="Search Item 1">
      <ArtistThumbnail />
      <Container5 />
      <Margin />
    </div>
  );
}

function ArtistThumbnail1() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[40px]" data-name="Artist thumbnail">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgArtistThumbnail1} />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[77.23px]">
        <p className="leading-[17.5px]">Miles Davis</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] w-[30.08px]">
        <p className="leading-[16px]">Artist</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[77.23px]" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="h-[8.167px] relative shrink-0 w-[16.167px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.1667 8.16667">
        <g id="Margin">
          <path d={svgPaths.p1332ccc0} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function SearchItem1() {
  return (
    <div className="absolute bg-[#131313] bottom-[8px] content-stretch flex gap-[12px] items-center left-[259.36px] pl-[8px] pr-[16px] py-[8px] rounded-[9999px] top-0" data-name="Search Item 2">
      <ArtistThumbnail1 />
      <Container8 />
      <Margin1 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <g id="Container">
          <path d={svgPaths.p25cdb920} fill="var(--fill-0, #2FF801)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(47,248,1,0.2)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Overlay">
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[106.67px]">
        <p className="leading-[17.5px]">Lofi Beats 2024</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] w-[36.14px]">
        <p className="leading-[16px]">Album</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[106.67px]" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="h-[8.167px] relative shrink-0 w-[16.167px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.1667 8.16667">
        <g id="Margin">
          <path d={svgPaths.p1332ccc0} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function SearchItem2() {
  return (
    <div className="absolute bg-[#131313] bottom-[8px] content-stretch flex gap-[12px] items-center left-[462.61px] pl-[8px] pr-[16px] py-[8px] rounded-[9999px] top-0" data-name="Search Item 3">
      <Overlay />
      <Container12 />
      <Margin2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[64px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <SearchItem />
      <SearchItem1 />
      <SearchItem2 />
    </div>
  );
}

function SectionRecentSearchesHorizontalScrollChips() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section - Recent Searches (Horizontal Scroll/Chips)">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-white tracking-[-0.6px] w-full">
        <p className="leading-[32px]">Browse All</p>
      </div>
    </div>
  );
}

function ElectronicCategory() {
  return (
    <div className="relative rounded-[6px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Electronic category">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[6px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgElectronicCategory} />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[-0.6px] w-full">
        <p className="leading-[32px]">Electronic</p>
      </div>
    </div>
  );
}

function CategoryCard1Electronic() {
  return (
    <div className="col-1 justify-self-stretch relative rounded-[32px] row-1 self-start shrink-0" data-name="Category Card 1: Electronic" style={{ backgroundImage: "linear-gradient(135deg, rgb(26, 26, 26) 0%, rgb(38, 38, 38) 100%)" }}>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[103px] pt-[24px] px-[24px] relative w-full">
          <div className="absolute inset-0 mix-blend-overlay" data-name="Gradient" style={{ backgroundImage: "linear-gradient(135deg, rgba(58, 249, 231, 0.3) 0%, rgba(58, 249, 231, 0) 100%)" }} />
          <div className="absolute flex inset-[28.02%_-26.98%_-16.97%_38.02%] items-center justify-center max-w-[390px]">
            <div className="flex-none rotate-12 size-[119.25px]">
              <ElectronicCategory />
            </div>
          </div>
          <Heading3 />
        </div>
      </div>
    </div>
  );
}

function SynthwaveCategory() {
  return (
    <div className="relative rounded-[6px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Synthwave category">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[6px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSynthwaveCategory} />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[-0.6px] w-full">
        <p className="leading-[32px]">Synthwave</p>
      </div>
    </div>
  );
}

function CategoryCard2Synthwave() {
  return (
    <div className="col-2 justify-self-stretch relative rounded-[32px] row-1 self-start shrink-0" data-name="Category Card 2: Synthwave" style={{ backgroundImage: "linear-gradient(135deg, rgb(19, 19, 19) 0%, rgb(32, 32, 31) 100%)" }}>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[103px] pt-[24px] px-[24px] relative w-full">
          <div className="absolute inset-0 mix-blend-overlay" data-name="Gradient" style={{ backgroundImage: "linear-gradient(135deg, rgba(47, 248, 1, 0.2) 0%, rgba(47, 248, 1, 0) 100%)" }} />
          <div className="absolute flex inset-[28.02%_-26.98%_-16.97%_38.02%] items-center justify-center max-w-[390px]">
            <div className="flex-none rotate-12 size-[119.25px]">
              <SynthwaveCategory />
            </div>
          </div>
          <Heading4 />
        </div>
      </div>
    </div>
  );
}

function LoFiCategory() {
  return (
    <div className="absolute aspect-[4/5] bottom-0 left-[9.99%] right-[-9.99%] rounded-tl-[6px] rounded-tr-[6px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" data-name="Lo-fi category">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[6px] rounded-tr-[6px]">
        <img alt="" className="absolute h-full left-[-12.5%] max-w-none top-0 w-[125%]" src={imgLoFiCategory} />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[-0.6px] w-full">
        <p className="leading-[32px]">Lo-fi</p>
      </div>
    </div>
  );
}

function CategoryCard3LoFiTallBentoStyle() {
  return (
    <div className="col-1 justify-self-stretch relative rounded-[32px] row-2 self-start shrink-0" data-name="Category Card 3: Lo-fi (Tall Bento Style)" style={{ backgroundImage: "linear-gradient(116.565deg, rgb(26, 26, 26) 0%, rgb(38, 38, 38) 100%)" }}>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[262px] pt-[24px] px-[24px] relative w-full">
          <div className="absolute inset-0 mix-blend-overlay" data-name="Gradient" style={{ backgroundImage: "linear-gradient(116.565deg, rgba(105, 200, 255, 0.3) 0%, rgba(105, 200, 255, 0) 100%)" }} />
          <LoFiCategory />
          <Heading5 />
        </div>
      </div>
    </div>
  );
}

function RockCategory() {
  return (
    <div className="relative rounded-[6px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Rock category">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[6px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRockCategory} />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[-0.6px] w-full">
        <p className="leading-[32px]">Rock</p>
      </div>
    </div>
  );
}

function CategoryCard4Rock() {
  return (
    <div className="col-2 justify-self-stretch relative rounded-[32px] row-2 self-start shrink-0" data-name="Category Card 4: Rock" style={{ backgroundImage: "linear-gradient(135deg, rgb(19, 19, 19) 0%, rgb(32, 32, 31) 100%)" }}>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[103px] pt-[24px] px-[24px] relative w-full">
          <div className="absolute inset-0 mix-blend-overlay" data-name="Gradient" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 113, 108, 0.2) 0%, rgba(255, 113, 108, 0) 100%)" }} />
          <div className="absolute flex inset-[28.02%_-26.98%_-16.97%_38.02%] items-center justify-center max-w-[390px]">
            <div className="flex-none rotate-12 size-[119.25px]">
              <RockCategory />
            </div>
          </div>
          <Heading6 />
        </div>
      </div>
    </div>
  );
}

function HipHopCategory() {
  return (
    <div className="relative rounded-[6px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Hip Hop category">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[6px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgHipHopCategory} />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[-0.6px] w-full">
        <p className="leading-[32px]">Hip Hop</p>
      </div>
    </div>
  );
}

function CategoryCard5HipHop() {
  return (
    <div className="col-1 justify-self-stretch relative rounded-[32px] row-3 self-start shrink-0" data-name="Category Card 5: Hip Hop" style={{ backgroundImage: "linear-gradient(135deg, rgb(14, 14, 14) 0%, rgb(38, 38, 38) 100%)" }}>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[103px] pt-[24px] px-[24px] relative w-full">
          <div className="absolute inset-0 mix-blend-overlay" data-name="Gradient" style={{ backgroundImage: "linear-gradient(135deg, rgba(53, 246, 228, 0.3) 0%, rgba(53, 246, 228, 0) 100%)" }} />
          <div className="absolute flex inset-[28.02%_-26.98%_-16.97%_38.02%] items-center justify-center max-w-[390px]">
            <div className="flex-none rotate-12 size-[119.25px]">
              <HipHopCategory />
            </div>
          </div>
          <Heading7 />
        </div>
      </div>
    </div>
  );
}

function PodcastsCategory() {
  return (
    <div className="relative rounded-[6px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Podcasts category">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[6px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPodcastsCategory} />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[-0.6px] w-full">
        <p className="leading-[32px]">Podcasts</p>
      </div>
    </div>
  );
}

function CategoryCard6Podcasts() {
  return (
    <div className="col-2 justify-self-stretch relative rounded-[32px] row-3 self-start shrink-0" data-name="Category Card 6: Podcasts" style={{ backgroundImage: "linear-gradient(135deg, rgb(19, 19, 19) 0%, rgb(38, 38, 38) 100%)" }}>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[103px] pt-[24px] px-[24px] relative w-full">
          <div className="absolute inset-0 mix-blend-overlay" data-name="Gradient" style={{ backgroundImage: "linear-gradient(135deg, rgba(47, 248, 1, 0.3) 0%, rgba(47, 248, 1, 0) 100%)" }} />
          <div className="absolute flex inset-[28.02%_-26.98%_-16.97%_38.02%] items-center justify-center max-w-[390px]">
            <div className="flex-none rotate-12 size-[119.25px]">
              <PodcastsCategory />
            </div>
          </div>
          <Heading8 />
        </div>
      </div>
    </div>
  );
}

function NewReleasesCategory() {
  return (
    <div className="relative rounded-[6px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="New Releases category">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[6px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgNewReleasesCategory} />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[-0.6px] w-full">
        <p className="leading-[32px] mb-0">New</p>
        <p className="leading-[32px]">Releases</p>
      </div>
    </div>
  );
}

function CategoryCard7NewReleases() {
  return (
    <div className="col-1 justify-self-stretch relative rounded-[32px] row-4 self-start shrink-0" data-name="Category Card 7: New Releases" style={{ backgroundImage: "linear-gradient(135deg, rgb(19, 19, 19) 0%, rgba(23, 234, 217, 0.1) 100%)" }}>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[71px] pt-[24px] px-[24px] relative w-full">
          <div className="absolute inset-0" data-name="Gradient" style={{ backgroundImage: "linear-gradient(135deg, rgba(58, 249, 231, 0.1) 0%, rgba(58, 249, 231, 0) 100%)" }} />
          <div className="absolute flex inset-[28.02%_-26.98%_-16.97%_38.02%] items-center justify-center max-w-[390px]">
            <div className="flex-none rotate-12 size-[119.25px]">
              <NewReleasesCategory />
            </div>
          </div>
          <Heading9 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[____159px_318px_159px_159px] relative shrink-0 w-full" data-name="Container">
      <CategoryCard1Electronic />
      <CategoryCard2Synthwave />
      <CategoryCard3LoFiTallBentoStyle />
      <CategoryCard4Rock />
      <CategoryCard5HipHop />
      <CategoryCard6Podcasts />
      <CategoryCard7NewReleases />
    </div>
  );
}

function SectionBrowseAllBentoGrid() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start pt-[8px] relative shrink-0 w-full" data-name="Section - Browse All Bento Grid">
      <Heading2 />
      <Container15 />
    </div>
  );
}

function MainCanvas() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Main Canvas">
      <div className="content-stretch flex flex-col gap-[40px] items-start max-w-[inherit] pb-[128px] pt-[96px] px-[24px] relative w-full">
        <SearchBarSection />
        <SectionRecentSearchesHorizontalScrollChips />
        <SectionBrowseAllBentoGrid />
      </div>
    </div>
  );
}

function CurrentTrack() {
  return (
    <div className="relative rounded-[32px] shrink-0 size-[48px]" data-name="Current Track">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[32px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgCurrentTrack} />
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.5px] relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[90.81px]">
        <p className="leading-[20px]">Midnight City</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[2px] h-[12px] items-end relative shrink-0" data-name="Container">
      <div className="bg-[#2ff801] h-[8px] rounded-[9999px] shrink-0 w-[2px]" data-name="Vertical Divider" />
      <div className="bg-[#2ff801] h-[12px] rounded-[9999px] shrink-0 w-[2px]" data-name="Vertical Divider" />
      <div className="bg-[#2ff801] h-[6px] rounded-[9999px] shrink-0 w-[2px]" data-name="Vertical Divider" />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[4px] items-center mb-[-0.5px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2ff801] text-[12px] w-[25.69px]">
        <p className="leading-[16px]">M83</p>
      </div>
      <Container19 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.5px] relative shrink-0 w-[90.81px]" data-name="Container">
      <Heading10 />
      <Container18 />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative">
        <CurrentTrack />
        <Container17 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="Container">
          <path d={svgPaths.p172b9974} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 size-[25px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Container">
          <path d={svgPaths.peec5a00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center px-[8px] relative">
        <Container21 />
        <Container22 />
      </div>
    </div>
  );
}

function OverlayBorderShadowOverlayBlur() {
  return (
    <div className="backdrop-blur-[8px] bg-[rgba(19,19,19,0.8)] relative rounded-[48px] shrink-0 w-full" data-name="Overlay+Border+Shadow+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[48px] shadow-[0px_-10px_30px_0px_rgba(0,0,0,0.5)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13px] relative w-full">
          <Container16 />
          <Container20 />
        </div>
      </div>
    </div>
  );
}

function MiniPlayerFloatingOverNav() {
  return (
    <div className="absolute bottom-[96px] content-stretch flex flex-col items-start left-[16px] right-[16px]" data-name="Mini Player (Floating over Nav)">
      <OverlayBorderShadowOverlayBlur />
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

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#3af9e7] text-[24px] tracking-[-1.2px] w-[103.05px]">
        <p className="leading-[32px]">MaxLinify</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Border />
      <Heading />
    </div>
  );
}

function Container24() {
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

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container24 />
    </div>
  );
}

function HeaderTopAppBarExecution() {
  return (
    <div className="absolute backdrop-blur-[12px] content-stretch flex items-center justify-between left-0 px-[24px] py-[16px] top-0 w-[390px]" data-name="Header - TopAppBar Execution" style={{ backgroundImage: "linear-gradient(rgb(14, 14, 14) 0%, rgba(14, 14, 14, 0) 100%), linear-gradient(90deg, rgba(14, 14, 14, 0.7) 0%, rgba(14, 14, 14, 0.7) 100%)" }}>
      <Container23 />
      <Button1 />
    </div>
  );
}

function Container25() {
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

function Margin3() {
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
      <Container25 />
      <Margin3 />
    </div>
  );
}

function Container26() {
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

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#3af9e7] text-[10px] tracking-[1px] uppercase w-[47.19px]">
        <p className="leading-[15px]">Search</p>
      </div>
    </div>
  );
}

function LinkSearchActive() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link - Search (ACTIVE)">
      <Container26 />
      <Margin4 />
    </div>
  );
}

function Container27() {
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

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] tracking-[1px] uppercase w-[48.2px]">
        <p className="leading-[15px]">Library</p>
      </div>
    </div>
  );
}

function LinkLibrary() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link - Library">
      <Container27 />
      <Margin5 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
        <g id="Container">
          <path d={svgPaths.p39955c80} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] tracking-[1px] uppercase w-[73.13px]">
        <p className="leading-[15px]">Community</p>
      </div>
    </div>
  );
}

function LinkCommunity() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link - Community">
      <Container28 />
      <Margin6 />
    </div>
  );
}

function BottomNavBarExecution() {
  return (
    <div className="absolute backdrop-blur-[8px] bg-[rgba(19,19,19,0.8)] bottom-0 content-stretch flex gap-[38.8px] items-center left-0 pb-[32px] pl-[35.41px] pr-[35.46px] pt-[12px] rounded-tl-[32px] rounded-tr-[32px] shadow-[0px_-10px_30px_0px_rgba(0,0,0,0.5)] w-[390px]" data-name="BottomNavBar Execution">
      <LinkHome />
      <LinkSearchActive />
      <LinkLibrary />
      <LinkCommunity />
    </div>
  );
}

export default function MaxLinifySearchExplore() {
  return (
    <div className="bg-[#0e0e0e] content-stretch flex flex-col items-start relative size-full" data-name="MaxLinify - Search & Explore">
      <MainCanvas />
      <MiniPlayerFloatingOverNav />
      <HeaderTopAppBarExecution />
      <BottomNavBarExecution />
    </div>
  );
}