import clsx from "clsx";
import imgImg from "@/assets/6624779691f76cbcca90705e206d90aec6227e21.png";
type PTextProps = {
  text: string;
  additionalClassNames?: string;
};

function PText({ text, additionalClassNames = "" }: PTextProps) {
  return (
    <div className={clsx("absolute h-[32px] left-[24px] w-[85.578px]", additionalClassNames)}>
      <p className="-translate-x-full absolute font-['Chosun_Centennial:Regular',sans-serif] leading-[32px] left-[85.82px] not-italic text-[#0a0a0a] text-[24px] text-right top-0">{text}</p>
    </div>
  );
}

export default function IndependenceDayCelebrationPage() {
  return (
    <div className="bg-white relative size-full" data-name="Independence Day Celebration Page">
      <div className="absolute h-[813px] left-0 top-0 w-[1099px]" data-name="img">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg} />
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.1)] h-[813px] left-0 top-0 w-[1099px]" data-name="Container" />
      <div className="absolute bg-[rgba(255,255,255,0.9)] h-[320px] left-[949.42px] rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[246.5px] w-[133.578px]" data-name="Container">
        <div className="absolute h-[28px] left-[24px] top-[32px] w-[85.578px]" data-name="p">
          <p className="-translate-x-full absolute font-['Chosun_Centennial:Regular',sans-serif] leading-[28px] left-[86px] not-italic text-[#0a0a0a] text-[18px] text-right top-[-0.5px]">제 107주년</p>
        </div>
        <PText text="·" additionalClassNames="top-[68px]" />
        <div className="absolute h-[32px] left-[24px] top-[104px] w-[85.578px]" data-name="p">
          <p className="-translate-x-full absolute font-['Chosun_Centennial:Regular',sans-serif] leading-[32px] left-[85.84px] not-italic text-[#0a0a0a] text-[24px] text-right top-0">3</p>
        </div>
        <PText text="·" additionalClassNames="top-[140px]" />
        <div className="absolute h-[32px] left-[24px] top-[176px] w-[85.578px]" data-name="p">
          <p className="-translate-x-full absolute font-['Chosun_Centennial:Regular',sans-serif] leading-[32px] left-[86.55px] not-italic text-[#0a0a0a] text-[24px] text-right top-0">1절</p>
        </div>
        <div className="absolute h-[24px] left-[24px] top-[232px] w-[85.578px]" data-name="p">
          <p className="-translate-x-full absolute font-['Chosun_Centennial:Regular',sans-serif] leading-[24px] left-[85.94px] not-italic text-[#0a0a0a] text-[16px] text-right top-0">그 날의</p>
        </div>
        <div className="absolute h-[24px] left-[24px] top-[264px] w-[85.578px]" data-name="p">
          <p className="-translate-x-full absolute font-['Chosun_Centennial:Regular',sans-serif] leading-[24px] left-[86.34px] not-italic text-[#0a0a0a] text-[16px] text-right top-0">탑골공원</p>
        </div>
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.5)] h-[44px] left-[951.23px] rounded-[4px] top-[753px] w-[131.766px]" data-name="Container">
        <p className="absolute font-['Chosun_Centennial:Regular',sans-serif] leading-[28px] left-[16px] not-italic text-[20px] text-white top-[7.5px]">1919.03.01</p>
      </div>
      <div className="absolute content-stretch flex h-[813px] items-center justify-center left-0 top-0 w-[1099px]" data-name="Container">
        <div className="h-[132px] relative shrink-0 w-[647.234px]" data-name="motion.div">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
            <div className="absolute h-[48px] left-0 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)] top-0 w-[647.234px]" data-name="h1">
              <p className="-translate-x-1/2 absolute font-['Chosun_Centennial:Regular',sans-serif] leading-[48px] left-[324px] not-italic text-[48px] text-center text-white top-0">{`"대한독립만세" 를 함께 외쳐보자`}</p>
            </div>
            <div className="absolute bg-white h-[52px] left-[257.41px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[80px] w-[132.406px]" data-name="button">
              <p className="-translate-x-1/2 absolute font-['Chosun_Centennial:Regular',sans-serif] leading-[28px] left-[66.5px] not-italic text-[#101828] text-[20px] text-center top-[11.5px]">확인</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}