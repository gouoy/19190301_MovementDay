import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Github, Linkedin } from "lucide-react";
import { supabase } from "@/lib/supabase";
import backgroundImage from "@/assets/6624779691f76cbcca90705e206d90aec6227e21.png";

// ─── 독립선언서 이미지 ──────────────────────────────────────
import declarationImage from "@/assets/4675b8773862256e8c01d849d8a121c1bbff4384.png";

// ─── 캐릭터 PNG 이미지 (신규 6종) ─────────────────────────
import manFlag from "@/assets/5e971b880df0ebd58196b5d0e741cfdf7436c2a7.png";  // 남성 태극기
import manStand from "@/assets/b6bd01741249bd5b3ea46059bd01178724650ee9.png";  // 남성 일반
import womanFlag from "@/assets/ce9d699b8713deb31680173441a94c70ef410e2e.png";  // 여성 태극기
import womanStand from "@/assets/4362061a2133e6fcfbb1e0f7ce8be9168b61311f.png";  // 여성 일반
import studentFlag from "@/assets/3f16c1ab5c007998dbc549c5dbae01520b4dd88d.png";  // 학생 태극기
import studentStand from "@/assets/9310768a956d43062be28e8c00f2c52a93e96b40.png";  // 학생 일반

type Stage = "welcome" | "listening" | "ending";

// ─── Character assets ───────────────────────────────────────
const CHAR_ASSETS = {
  man_flag: { src: manFlag },
  man_stand: { src: manStand },
  woman_flag: { src: womanFlag },
  woman_stand: { src: womanStand },
  student_flag: { src: studentFlag },
  student_stand: { src: studentStand },
} as const;

type CharKey = keyof typeof CHAR_ASSETS;

// 200명 순서 — 6종 순환, 태극기 포즈 60% 비중
const CHAR_TYPES: CharKey[] = [
  "man_flag", "woman_flag", "student_flag", "man_flag", "woman_flag",
  "student_flag", "man_stand", "woman_flag", "student_flag", "man_flag",
  "woman_stand", "student_flag", "man_flag", "woman_flag", "student_stand",
];
const CHAR_ORDER: CharKey[] = Array.from({ length: 200 }, (_, i) => CHAR_TYPES[i % CHAR_TYPES.length]);

// ─── 엔딩 크레딧 텍스트 (플레이스홀더 — 텍스트 파일로 교체 예정) ──
const CREDIT_TEXT = `하늘이 저들의 더러운 덕을 미워하시어 우리에게 좋은 기회를 내려 주시니, 하늘의 뜻에 순응하고 인류의 뜻에 응하여 대한 독립을 선포하는 동시에 저들이 강제 병합한 죄악을 선포하고 징벌하노라.

첫째, 일본의 합방 동기는 이른바 범일본주의를 아시아에 함부로 행사하려는 것이니 이는 동양의 적이요, 둘째, 일본의 합방 수단은 사기와 강박, 불법과 무도, 무력과 폭행이 지극히 갖추어졌으니 이는 국제 법규의 악마이며, 셋째, 일본의 합방 결과는 군경의 야만적인 권력과 경제적 압박으로 우리 민족을 갉아먹으며, 종교를 강박하고 교육을 제한하여 세계 문화를 가로막았으니 이는 인류의 적이라.

그러므로 하늘의 뜻과 인도, 정의와 법리에 비추어 만국에 입증함으로써 합방이 무효임을 널리 선포하며, 저들의 죄악을 응징하고 우리의 권리를 회복하노라.

아아, 일본의 무력적인 죄악이여! 작게 징벌하여 크게 경계함이 너희의 복이니, 섬은 섬으로 돌아가고 반도는 반도로 돌아가고 대륙은 대륙으로 돌아갈지어다. 각각 그 본래의 상태로 회복함은 아시아의 다행인 동시에 너희에게도 다행이거니와, 완고하고 미련하여 깨닫지 못하면 모든 화근이 너희에게 있을 것이니, 옛 땅을 회복하고 스스로 새로워지는 이익을 거듭 타일러 깨우치노라.

시험 삼아 보아라. 백성의 마귀요 도적인 전제와 강권은 남은 불꽃이 이미 다하였고, 인류에게 부여된 평등과 평화는 밝은 해가 하늘에 떠올랐으니, 공의의 심판과 자유의 보편화는 진실로 오랜 재앙을 한 번에 씻어내고자 하는 하늘의 뜻이 실현되는 것이요, 약한 나라와 짓밟힌 민족을 구제하는 대지의 복음이라.

위대하도다 시대의 대의여! 이 때를 만난 우리가 무도한 강권의 속박을 벗어버리고 광명한 평화 독립을 회복함은 하늘의 뜻을 받들어 드날리며 인심에 순응하고자 함이며, 지구에 발붙인 권리로 세계를 개조하여 대동(大同)의 건설에 협찬하는 까닭이다.

이에 이천만 대중의 붉은 진심을 대표하여 감히 크고 훌륭하신 신께 밝게 고하며, 세계 만방에 널리 알리노니, 우리의 독립은 하늘과 사람이 함께 응하는 순수한 동기로 민족 스스로를 보존하려는 정당한 권리를 행사하는 것이요, 결코 눈앞의 이해관계에 얽힌 우연한 충동이 아니며, 은혜와 원한에 얽매인 감정으로 야만적인 보복 수단에 만족하려는 것이 아니다.

진실로 영원히 변치 않는 국민의 지극한 정성이 폭발하여 저들로 하여금 스스로 깨닫고 새로워지게 함이며, 우리의 결실은 야비한 정치를 초월하여 진정한 도의를 실현하는 것이다.

아아, 우리 대중아! 공의로 독립한 자는 공의로 나아갈지라. 모든 수단을 다하여 군국 전제를 뿌리 뽑아 민족 평등을 온 세계에 널리 베풀지니, 이는 우리 독립의 첫 번째 뜻이요. 무력 병합을 근절하여 천하를 평등하게 하는 공명정대한 길로 나아갈지니, 이는 우리 독립의 본분이다. 비밀 동맹과 사사로운 전쟁을 엄금하고 대동 평화를 선전할지니, 이는 우리나라를 회복하는 사명이다.

같은 권리와 같은 부를 모든 동포에게 베풀어 남녀와 빈부를 고르게 하며, 똑같이 어질고 똑같이 오래 살게 하여 지혜로운 자와 어리석은 자, 늙은이와 젊은이를 균등하게 하여 온 세상 인류를 구제할지니, 이는 우리가 나라를 세우는 깃발이다. 나아가 국제적인 불의를 감독하고 우주의 진선미를 구체적으로 실현할지니, 이는 우리 한민족이 시대에 응하여 부활하는 궁극적인 뜻이니라.

아아, 마음을 같이 하고 덕을 같이 하는 이천만 형제자매여! 우리 단군 대황조께서 상제(하느님)의 곁에서 우리의 기운을 명하시며, 세계와 시대가 우리의 복리와 이익을 돕는도다. 정의는 무적의 칼이니, 이로써 하늘의 뜻을 거스르는 마귀와 나라를 훔친 도적을 단숨에 베어버려라. 이로써 사천 년 조상의 빛나는 영광을 드러낼 것이며, 이로써 이천만 동포의 운명을 개척할지니라.

일어날지어다 독립군아! 가지런히 나아갈지어다 독립군아! 천지가 그물처럼 얽혀 있어 한 번 죽는 것은 사람이 능히 피하지 못할 바인즉, 개와 돼지 같은 일생을 그 누가 구차하게 도모하리오. 제 몸을 죽여 인을 이루면 이천만 동포가 한 몸으로 부활할 것이니 한 몸을 어찌 아끼며, 집안을 기울여 나라를 회복하면 삼천리 비옥한 땅이 자기의 소유가 될 것이니 일가를 희생하라.

아아, 마음과 덕을 같이하는 이천만 형제자매여! 국민의 본분을 자각한 독립인 줄을 기억할 것이며, 동양 평화를 보장하고 인류 평등을 실시하기 위한 자립인 줄을 명심할 것이며, 하늘의 밝은 명령을 받들어 모든 삿된 그물에서 벗어나는 건국인 줄을 확신하여, 육탄 혈전으로 독립을 완성할지어다`;

// ─── 200명 위치 배열 ───────────────────────────────────────
// 정자 금지구역: x∈[45,71] AND y∈[34,65] (컨테이너 right:91px 보정 포함)
const FIXED_POSITIONS = [
  // ── Wave 1 (40명): 정자 좌우 측면 ──
  { x: 28, y: 57 }, { x: 24, y: 58 }, { x: 20, y: 59 }, { x: 16, y: 58 }, { x: 12, y: 57 },
  { x: 26, y: 64 }, { x: 22, y: 65 }, { x: 18, y: 64 }, { x: 14, y: 65 }, { x: 10, y: 64 },
  { x: 28, y: 71 }, { x: 24, y: 70 }, { x: 20, y: 72 }, { x: 16, y: 71 }, { x: 10, y: 70 },
  { x: 26, y: 78 }, { x: 22, y: 77 }, { x: 18, y: 78 }, { x: 12, y: 76 }, { x: 8, y: 72 },
  { x: 73, y: 57 }, { x: 75, y: 58 }, { x: 74, y: 59 }, { x: 78, y: 58 }, { x: 82, y: 57 },
  { x: 73, y: 64 }, { x: 72, y: 65 }, { x: 76, y: 64 }, { x: 80, y: 65 }, { x: 84, y: 64 },
  { x: 60, y: 71 }, { x: 64, y: 70 }, { x: 68, y: 72 }, { x: 72, y: 71 }, { x: 78, y: 70 },
  { x: 62, y: 78 }, { x: 66, y: 77 }, { x: 70, y: 78 }, { x: 76, y: 76 }, { x: 80, y: 72 },

  // ── Wave 2 (40명): 하단 + 측면 확장 ──
  { x: 10, y: 87 }, { x: 18, y: 87 }, { x: 26, y: 87 }, { x: 34, y: 87 }, { x: 44, y: 87 },
  { x: 54, y: 87 }, { x: 62, y: 87 }, { x: 70, y: 87 }, { x: 78, y: 87 }, { x: 86, y: 87 },
  { x: 6, y: 91 }, { x: 14, y: 91 }, { x: 24, y: 91 }, { x: 36, y: 91 }, { x: 44, y: 92 },
  { x: 54, y: 92 }, { x: 66, y: 91 }, { x: 76, y: 91 }, { x: 84, y: 91 },
  { x: 28, y: 82 }, { x: 22, y: 82 }, { x: 14, y: 82 }, { x: 8, y: 80 },
  { x: 60, y: 82 }, { x: 66, y: 82 }, { x: 74, y: 82 }, { x: 80, y: 80 },
  { x: 4, y: 60 }, { x: 4, y: 70 }, { x: 2, y: 78 },
  { x: 86, y: 60 }, { x: 86, y: 70 }, { x: 88, y: 78 },
  { x: 36, y: 51 }, { x: 42, y: 50 }, { x: 40, y: 51 },
  { x: 30, y: 55 }, { x: 73, y: 55 },

  // ── Wave 3 (40명): 상단 좌·우 코너 ──
  { x: 8, y: 32 }, { x: 14, y: 30 }, { x: 20, y: 32 }, { x: 26, y: 30 },
  { x: 6, y: 38 }, { x: 12, y: 36 }, { x: 18, y: 38 }, { x: 24, y: 36 },
  { x: 4, y: 44 }, { x: 10, y: 42 }, { x: 16, y: 44 }, { x: 22, y: 42 }, { x: 28, y: 44 },
  { x: 6, y: 50 }, { x: 12, y: 48 }, { x: 18, y: 50 }, { x: 24, y: 48 }, { x: 28, y: 52 },
  { x: 4, y: 34 }, { x: 16, y: 34 },
  { x: 80, y: 32 }, { x: 74, y: 30 }, { x: 76, y: 32 }, { x: 82, y: 30 },
  { x: 82, y: 38 }, { x: 76, y: 36 }, { x: 78, y: 38 }, { x: 74, y: 36 },
  { x: 84, y: 44 }, { x: 78, y: 42 }, { x: 80, y: 44 }, { x: 74, y: 42 }, { x: 72, y: 44 },
  { x: 82, y: 50 }, { x: 76, y: 48 }, { x: 78, y: 50 }, { x: 74, y: 48 }, { x: 72, y: 52 },
  { x: 84, y: 34 }, { x: 72, y: 34 },

  // ── Wave 4 (40명): 상단 중앙 + 극단 엣지 ──
  { x: 32, y: 32 }, { x: 38, y: 30 }, { x: 44, y: 32 }, { x: 40, y: 30 }, { x: 36, y: 32 },
  { x: 30, y: 38 }, { x: 42, y: 36 }, { x: 38, y: 36 }, { x: 73, y: 38 }, { x: 75, y: 38 },
  { x: 32, y: 44 }, { x: 38, y: 42 }, { x: 44, y: 44 }, { x: 42, y: 42 }, { x: 76, y: 44 },
  { x: 30, y: 50 }, { x: 36, y: 48 }, { x: 44, y: 48 }, { x: 40, y: 48 }, { x: 73, y: 50 },
  { x: 2, y: 40 }, { x: 2, y: 60 }, { x: 2, y: 80 },
  { x: 88, y: 40 }, { x: 88, y: 60 }, { x: 88, y: 80 },
  { x: 4, y: 86 }, { x: 8, y: 86 }, { x: 14, y: 85 }, { x: 22, y: 85 },
  { x: 84, y: 86 }, { x: 80, y: 86 }, { x: 74, y: 85 }, { x: 72, y: 85 },
  { x: 36, y: 86 }, { x: 52, y: 86 },
  { x: 38, y: 68 }, { x: 48, y: 67 }, { x: 56, y: 68 }, { x: 62, y: 67 },

  // ── Wave 5 (40명): 전체 화면 완전 채움 ──
  { x: 2, y: 30 }, { x: 6, y: 30 }, { x: 10, y: 30 }, { x: 16, y: 30 },
  { x: 86, y: 30 }, { x: 82, y: 30 }, { x: 78, y: 30 }, { x: 72, y: 30 },
  { x: 42, y: 34 }, { x: 38, y: 34 }, { x: 74, y: 34 },
  { x: 42, y: 40 }, { x: 74, y: 40 },
  { x: 30, y: 44 }, { x: 73, y: 46 },
  { x: 6, y: 88 }, { x: 4, y: 93 }, { x: 84, y: 88 }, { x: 86, y: 93 },
  { x: 10, y: 93 }, { x: 20, y: 93 }, { x: 30, y: 93 }, { x: 40, y: 93 },
  { x: 50, y: 93 }, { x: 60, y: 93 }, { x: 70, y: 93 }, { x: 80, y: 93 },
  { x: 42, y: 73 }, { x: 52, y: 72 }, { x: 58, y: 74 }, { x: 36, y: 78 },
  { x: 8, y: 54 }, { x: 80, y: 54 },
  { x: 22, y: 56 }, { x: 73, y: 56 },
  { x: 48, y: 77 }, { x: 56, y: 79 },
  { x: 44, y: 80 }, { x: 52, y: 81 },
  { x: 44, y: 30 },
];

// ─── CharacterImage ────────────────────────────────────────
interface CharacterImageProps { charKey: CharKey; }

const CharacterImage = ({ charKey }: CharacterImageProps) => {
  const { src } = CHAR_ASSETS[charKey];
  return (
    <img
      src={src}
      alt=""
      draggable={false}
      style={{
        height: "44px",
        width: "auto",
        imageRendering: "pixelated",
        display: "block",
        userSelect: "none",
      }}
    />
  );
};

// ─── Main App ──────────────────────────────────────────────
export default function App() {
  const [stage, setStage] = useState<Stage>("welcome");
  const [count, setCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [showCreatorInfo, setShowCreatorInfo] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);
  const stageRef = useRef<Stage>("welcome");

  useEffect(() => {
    const handleVisitorCount = async () => {
      try {
        // 1. Get initial count
        const { count, error: fetchError } = await supabase
          .from("visitors")
          .select("*", { count: "exact", head: true });

        if (!fetchError && count !== null) {
          setVisitorCount(count);
        }

        // 2. Add current visit
        const { error: insertError } = await supabase
          .from("visitors")
          .insert([{}]);

        if (!insertError) {
          setVisitorCount((prev) => prev + 1);
        }
      } catch (err) {
        console.error("Supabase error:", err);
      }
    };

    handleVisitorCount();
  }, []);

  useEffect(() => { isListeningRef.current = isListening; }, [isListening]);
  useEffect(() => { stageRef.current = stage; }, [stage]);

  // ── Speech recognition setup ────────────────────────────
  useEffect(() => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) return;

    recognitionRef.current = new SR();
    recognitionRef.current.lang = "ko-KR";
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      const normalized = transcript.replace(/\s/g, "");
      if (normalized.includes("대한독립만세") || normalized.includes("대한민국만세")) {
        triggerCount();
      }
    };
    recognitionRef.current.onerror = (e: any) => {
      if (e.error === "no-speech") setStatusMessage("소리가 들리지 않습니다...");
    };
    recognitionRef.current.onend = () => {
      if (isListeningRef.current && stageRef.current === "listening") {
        try { recognitionRef.current.start(); } catch (_) { }
      }
    };
    return () => { try { recognitionRef.current?.stop(); } catch (_) { } };
  }, []);

  const triggerCount = () => {
    setCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        isListeningRef.current = false;
        setIsListening(false);
        try { recognitionRef.current?.stop(); } catch (_) { }
        // 200명 캐릭터가 다 나온 후 2.5초 뒤 엔딩 전환
        setTimeout(() => setStage("ending"), 2500);
      }
      return next;
    });
    setStatusMessage("✓ 대한독립만세!");
    setTimeout(() => setStatusMessage(""), 1200);
  };

  const startListening = () => {
    setStage("listening");
    setIsListening(true);
    isListeningRef.current = true;
    setStatusMessage("");
    try { recognitionRef.current?.start(); } catch (_) { }
  };

  const stopListening = () => {
    setIsListening(false);
    isListeningRef.current = false;
    try { recognitionRef.current?.stop(); } catch (_) { }
  };

  const handleConfirm = () => startListening();
  const handleStop = () => { stopListening(); setStage("welcome"); setCount(0); setStatusMessage(""); };
  const handleRestart = () => { setStage("welcome"); setCount(0); setStatusMessage(""); setShowCreatorInfo(false); setLinkCopied(false); };
  const handleSimulate = () => triggerCount();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText("https://19190301-movement-day.vercel.app/");
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const visibleCharacters = Math.min(count * 40, 200);

  const FONT = "'Chosun Centennial', 'Noto Serif KR', serif";

  const buttonStyle: React.CSSProperties = {
    width: "132px",
    height: "52px",
    fontSize: "20px",
    fontFamily: FONT,
    fontWeight: "normal",
    background: "white",
    color: "#101828",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 10px 15px rgba(0,0,0,0.1), 0px 4px 6px rgba(0,0,0,0.1)",
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ fontFamily: FONT }}
    >
      {/* ── CSS 애니메이션 ── */}
      <style>{`
        @keyframes charPop {
          from { opacity: 0; transform: translateX(-50%) scale(0) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) scale(1) translateY(0px); }
        }
        @keyframes scrollCredits {
          from { transform: translateY(0); }
          to   { transform: translateY(-100%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── 배경 (welcome/listening) ── */}
      {stage !== "ending" && (
        <>
          <img
            src={backgroundImage}
            alt="탑골공원 배경"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center", imageRendering: "pixelated" }}
          />

          {/* 캐릭터 레이어 */}
          {stage === "listening" && (
            <div
              className="absolute inset-0 pointer-events-none"
            >
              {FIXED_POSITIONS.slice(0, visibleCharacters).map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translateX(-50%)",
                    animation: `charPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both`,
                    animationDelay: `${(i % 40) * 0.03}s`,
                    willChange: "opacity, transform",
                  }}
                >
                  <CharacterImage charKey={CHAR_ORDER[i]} />
                </div>
              ))}
            </div>
          )}

          {/* 메인 콘텐츠 영역 */}
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              {/* ── Welcome ── */}
              {stage === "welcome" && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="relative w-full h-full"
                >
                  <div className="absolute top-[52px] left-0 right-0 flex justify-center">
                    <h1
                      className="text-white text-center"
                      style={{ fontSize: "30px", lineHeight: "1.4", fontFamily: FONT, fontWeight: "normal", textShadow: "0px 2px 8px rgba(0,0,0,0.4)" }}
                    >
                      "대한독립만세"를 함께 외쳐보자
                    </h1>
                  </div>
                  <div className="absolute top-[130px] left-0 right-0 flex justify-center">
                    <button
                      onClick={handleConfirm}
                      style={buttonStyle}
                      onMouseEnter={e => (e.currentTarget.style.background = "#f3f3f3")}
                      onMouseLeave={e => (e.currentTarget.style.background = "white")}
                    >
                      확인
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Listening ── */}
              {stage === "listening" && (
                <motion.div
                  key="listening"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="relative w-full h-full"
                >
                  <div className="absolute top-[52px] left-0 right-0 flex justify-center">
                    <h1
                      className="text-white text-center"
                      style={{ fontSize: "30px", lineHeight: "1.4", fontFamily: FONT, fontWeight: "normal", textShadow: "0px 2px 8px rgba(0,0,0,0.4)" }}
                    >
                      "대한독립만세"
                    </h1>
                  </div>
                  <div className="absolute top-[106px] left-0 right-0 flex justify-center">
                    <motion.p
                      className="text-white text-center"
                      style={{ fontSize: "17px", fontFamily: FONT, fontWeight: "normal", textShadow: "0px 2px 8px rgba(0,0,0,0.45)" }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {statusMessage || "듣는 중..."}
                    </motion.p>
                  </div>
                  <div className="absolute top-[142px] left-0 right-0 flex flex-col items-center gap-2">
                    <div className="flex gap-3">
                      {[1, 2, 3, 4, 5].map(n => (
                        <motion.div
                          key={n}
                          className={`w-4 h-4 rounded-full ${count >= n ? "bg-red-500" : "bg-white/50"}`}
                          animate={count >= n ? { scale: [0, 1.4, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        />
                      ))}
                    </div>
                    <p
                      className="text-white"
                      style={{ fontSize: "15px", fontFamily: FONT, fontWeight: "normal", textShadow: "0px 2px 6px rgba(0,0,0,0.4)" }}
                    >
                      {count}/5 외침
                    </p>
                  </div>
                  <div className="absolute top-[210px] left-0 right-0 flex justify-center">
                    <button
                      onClick={handleStop}
                      style={buttonStyle}
                      onMouseEnter={e => (e.currentTarget.style.background = "#f3f3f3")}
                      onMouseLeave={e => (e.currentTarget.style.background = "white")}
                    >
                      중지
                    </button>
                  </div>


                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── 우측 사이드바 ── */}
          <div
            className="absolute right-3 bg-white flex flex-col items-center"
            style={{ width: "75px", top: "16px", bottom: "16px", border: "1px solid #121212" }}
          >
            <div className="flex-1 flex flex-col items-center justify-center pt-6 pb-2">
              {["제", "1", "0", "7", "주", "년", ","].map((ch, i) => (
                <span
                  key={`a-${i}`}
                  style={{ fontSize: "16px", lineHeight: "1.7", fontFamily: FONT, fontWeight: "normal", display: "block", color: "#101828", textAlign: "center" }}
                >{ch}</span>
              ))}
              <div style={{ height: "16px" }} />
              {["3", "·", "1", "절"].map((ch, i) => (
                <span
                  key={`b-${i}`}
                  style={{ fontSize: "22px", lineHeight: "1.6", fontFamily: FONT, fontWeight: "normal", display: "block", color: "#101828", textAlign: "center" }}
                >{ch}</span>
              ))}
              <div style={{ height: "20px" }} />
              {["그", "날", "의", "", "탑", "골", "공", "원"].map((ch, i) =>
                ch === "" ? <div key={`c-${i}`} style={{ height: "8px" }} /> : (
                  <span
                    key={`c-${i}`}
                    style={{ fontSize: "16px", lineHeight: "1.7", fontFamily: FONT, fontWeight: "normal", display: "block", color: "#101828", textAlign: "center" }}
                  >{ch}</span>
                )
              )}
            </div>
            <div className="w-full flex items-center justify-center" style={{ backgroundColor: "#f5f0e6", padding: "10px 4px" }}>
              <span style={{ fontSize: "11px", fontFamily: FONT, fontWeight: "normal", color: "#101828", letterSpacing: "0.03em", whiteSpace: "nowrap" }}>
                1919.03.01
              </span>
            </div>
          </div>
        </>
      )}

      {/* ════════════════════════════════════════════════════════
          ── 엔딩 화면 (전체 오버레이) ──
          ════════════════════════════════════════════════════════ */}
      {stage === "ending" && (
        <div
          className="absolute inset-0 z-50 flex flex-col"
          style={{
            backgroundColor: "#1a1a1a",
            animation: "fadeInUp 1.5s cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
          {/* ── 상단: 태극기 + 제작자 정보 ── */}
          <div className="relative flex items-center gap-3 px-4 pt-4 sm:px-8 sm:pt-6" style={{ zIndex: 10 }}>
            <button
              onClick={() => setShowCreatorInfo(prev => !prev)}
              className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              style={{ background: "none", border: "none", padding: "4px", fontSize: "28px", lineHeight: 1 }}
              title="제작자 정보"
            >
              🇰🇷
            </button>

            {/* 제작자 정보 팝업 */}
            {showCreatorInfo && (
              <div
                className="flex items-center gap-3 px-4 py-2"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  animation: "fadeInUp 0.3s ease both",
                }}
              >
                <span className="text-white" style={{ fontSize: "14px", fontFamily: FONT, fontWeight: "normal", whiteSpace: "nowrap" }}>
                  제작: 김가영
                </span>
                <div className="flex items-center gap-2">
                  <a href="mailto:contact@example.com" className="text-white/70 hover:text-white transition-colors"><Mail size={18} /></a>
                  <a href="https://github.com/gouoy/19190301_MovementDay" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors"><Github size={18} /></a>
                  <a href="https://www.linkedin.com/in/gayeongk1m/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors"><Linkedin size={18} /></a>
                </div>
              </div>
            )}
          </div>

          {/* ── 메인 콘텐츠: 2열 (모바일: 세로 스택) ── */}
          <div className="flex-1 flex flex-col md:flex-row px-4 sm:px-8 gap-4 sm:gap-8 overflow-hidden min-h-0">

            {/* 좌측: 선언서 이미지 + 카운터 */}
            <div
              className="flex flex-col items-center justify-center gap-3 sm:gap-4 md:w-[45%] py-2 sm:py-4"
              style={{ animation: "fadeInUp 0.8s 0.3s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <h2
                className="text-white"
                style={{ fontSize: "16px", fontFamily: FONT, fontWeight: "normal", letterSpacing: "0.08em", opacity: 0.85 }}
              >
                대한독립선언서
              </h2>
              <div className="relative w-full flex justify-center">
                <img
                  src={declarationImage}
                  alt="대한독립선언서"
                  className="object-contain"
                  style={{
                    maxHeight: "min(50vh, 400px)",
                    maxWidth: "100%",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              </div>
              <p
                className="text-center"
                style={{
                  fontSize: "14px",
                  fontFamily: FONT,
                  fontWeight: "normal",
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.03em",
                }}
              >
                {visitorCount.toLocaleString()} 명이 독립선언에 동참하였습니다.
              </p>
            </div>

            {/* 우측: 엔딩 크레딧 스크롤 */}
            <div
              className="flex-1 flex items-center justify-center py-2 sm:py-4 min-h-0"
              style={{ animation: "fadeInUp 0.8s 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <div
                className="relative w-full h-full overflow-hidden bg-white"
                style={{
                  maxWidth: "480px",
                  maxHeight: "min(65vh, 520px)",
                  padding: "0",
                }}
              >
                <div
                  style={{
                    paddingTop: "min(65vh, 520px)",
                    animation: "scrollCredits 90s linear forwards",
                  }}
                >
                  <div
                    className="px-5 sm:px-8 pb-8"
                    style={{
                      fontSize: "15px",
                      fontFamily: FONT,
                      fontWeight: "normal",
                      lineHeight: "2",
                      color: "#1a1a1a",
                      textAlign: "center",
                      wordBreak: "keep-all",
                    }}
                  >
                    {CREDIT_TEXT.split("\n\n").map((para, i) => (
                      <p key={i} style={{ marginBottom: "24px" }}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 하단 버튼 ── */}
          <div
            className="flex justify-center gap-6 sm:gap-10 px-4 pb-6 sm:pb-8 pt-3"
            style={{ animation: "fadeInUp 0.8s 0.9s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <button
              onClick={handleRestart}
              className="cursor-pointer transition-colors"
              style={{
                width: "160px",
                height: "50px",
                fontSize: "17px",
                fontFamily: FONT,
                fontWeight: "normal",
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
            >
              다시하기
            </button>
            <button
              onClick={handleShare}
              className="cursor-pointer transition-colors"
              style={{
                width: "160px",
                height: "50px",
                fontSize: "17px",
                fontFamily: FONT,
                fontWeight: "normal",
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
            >
              {linkCopied ? "링크 복사됨" : "공유하기"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}