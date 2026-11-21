
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  ContactShadows,
  Sparkles,
  PresentationControls,
} from "@react-three/drei";
import "./App.css";

const API_URL = "http://localhost:5000";

const portals = [
  { id: "home", label: "HOME", number: "01" },
  { id: "scanner", label: "SCANNER", number: "02" },
  { id: "info", label: "IDENTIFICATION", number: "03" },
  { id: "impact", label: "IMPACT", number: "04" },
  { id: "team", label: "ECOGENIX", number: "05" },
];

const teamMembers = [
  "Prithviraj C V",
  "Neha N",
  "Rahul B",
  "Prarthana Raj",
  "Prity Biswal",
  "Nithya M",
];

const resinCodes = [
  { code: 1, name: "PET", fullName: "Polyethylene Terephthalate" },
  { code: 2, name: "HDPE", fullName: "High-Density Polyethylene" },
  { code: 3, name: "PVC", fullName: "Polyvinyl Chloride" },
  { code: 4, name: "LDPE", fullName: "Low-Density Polyethylene" },
  { code: 5, name: "PP", fullName: "Polypropylene" },
  { code: 6, name: "PS", fullName: "Polystyrene" },
  { code: 7, name: "OTHER", fullName: "Other or mixed plastics" },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 75, damping: 22 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.35 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: "spring", stiffness: 75, damping: 22 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  }),
};

/* --------------------------------------------------
   3D PLASTIC BOTTLE
-------------------------------------------------- */

function Bottle() {
  const bottleRef = useRef();

  useFrame((state, delta) => {
    if (bottleRef.current) {
      bottleRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={bottleRef} position={[0, -0.05, 0]}>
        {/* Bottle body */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.61, 0.61, 2.15, 96]} />
          <meshPhysicalMaterial
            color="#b8f5d5"
            transparent
            opacity={0.48}
            roughness={0.08}
            transmission={0.72}
            thickness={0.65}
            ior={1.33}
            clearcoat={1}
          />
        </mesh>

        {/* Bottle shoulder */}
        <mesh position={[0, 1.28, 0]}>
          <cylinderGeometry args={[0.25, 0.61, 0.48, 96]} />
          <meshPhysicalMaterial
            color="#b8f5d5"
            transparent
            opacity={0.55}
            roughness={0.08}
            transmission={0.65}
            thickness={0.4}
          />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 1.64, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.28, 64]} />
          <meshPhysicalMaterial
            color="#b8f5d5"
            transparent
            opacity={0.6}
            roughness={0.1}
            transmission={0.6}
          />
        </mesh>

        {/* Cap */}
        <mesh position={[0, 1.88, 0]}>
          <cylinderGeometry args={[0.29, 0.29, 0.22, 64]} />
          <meshStandardMaterial
            color="#a6edb9"
            roughness={0.25}
            metalness={0.15}
          />
        </mesh>

        {/* Cap ridges */}
        {Array.from({ length: 12 }).map((_, index) => (
          <mesh
            key={index}
            position={[
              Math.cos((index / 12) * Math.PI * 2) * 0.292,
              1.88,
              Math.sin((index / 12) * Math.PI * 2) * 0.292,
            ]}
          >
            <boxGeometry args={[0.018, 0.16, 0.018]} />
            <meshStandardMaterial color="#d5ffe0" />
          </mesh>
        ))}

        {/* Bottle label */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.617, 0.617, 0.78, 96, 1, true]} />
          <meshStandardMaterial
            color="#174c37"
            roughness={0.55}
            metalness={0.1}
            side={2}
          />
        </mesh>

        {/* Label edges */}
        <mesh position={[0, 0.45, 0]}>
          <torusGeometry args={[0.618, 0.012, 8, 96]} />
          <meshStandardMaterial color="#a6edb9" />
        </mesh>

        <mesh position={[0, -0.35, 0]}>
          <torusGeometry args={[0.618, 0.012, 8, 96]} />
          <meshStandardMaterial color="#a6edb9" />
        </mesh>

        {/* Bottle base */}
        <mesh position={[0, -1.16, 0]}>
          <cylinderGeometry args={[0.48, 0.56, 0.12, 64]} />
          <meshPhysicalMaterial
            color="#b8f5d5"
            transparent
            opacity={0.6}
            roughness={0.12}
            transmission={0.55}
          />
        </mesh>
      </group>
    </Float>
  );
}

function BottleScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 38 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 5, 5]} intensity={3} />
      <pointLight position={[-3, 1, 3]} intensity={4} color="#9ce8b5" />
      <pointLight position={[3, -2, -3]} intensity={3} color="#65b7c0" />

      <Sparkles
        count={55}
        scale={5}
        size={2}
        speed={0.3}
        opacity={0.65}
        color="#b7ffd1"
      />

      <PresentationControls
        global
        cursor
        snap
        speed={1.5}
        zoom={0.85}
        rotation={[0, 0, 0]}
        polar={[-0.25, 0.25]}
        azimuth={[-0.6, 0.6]}
      >
        <Bottle />
      </PresentationControls>

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.35}
        scale={5}
        blur={2.5}
      />
    </Canvas>
  );
}

/* --------------------------------------------------
   HELPER FUNCTIONS
-------------------------------------------------- */

function renderInformation(value) {
  if (Array.isArray(value)) {
    if (value.length === 0) return <p>Information not available.</p>;

    return (
      <ul>
        {value.map((item, index) => (
          <li key={index}>{String(item)}</li>
        ))}
      </ul>
    );
  }

  if (value) return <p>{String(value)}</p>;

  return <p>Information not available.</p>;
}

/* --------------------------------------------------
   MAIN APPLICATION
-------------------------------------------------- */

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPortal, setCurrentPortal] = useState("home");
  const [direction, setDirection] = useState(1);

  const [scanMode, setScanMode] = useState("image");
  const [selectedCode, setSelectedCode] = useState("1");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [plastic, setPlastic] = useState(null);
  const [error, setError] = useState("");
  const [scanMessage, setScanMessage] = useState("");

  const fileInputRef = useRef(null);

  const currentIndex = portals.findIndex(
    (portal) => portal.id === currentPortal
  );

  function goToPortal(portalId) {
    const nextIndex = portals.findIndex(
      (portal) => portal.id === portalId
    );

    if (nextIndex === -1 || portalId === currentPortal) return;

    setDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentPortal(portalId);
  }

  function goNext() {
    if (currentIndex < portals.length - 1) {
      goToPortal(portals[currentIndex + 1].id);
    }
  }

  function goBack() {
    if (currentIndex > 0) {
      goToPortal(portals[currentIndex - 1].id);
    }
  }

  function resetScanner() {
    setResult(null);
    setPlastic(null);
    setError("");
    setScanMessage("");
    setSelectedFile(null);
    setPreview("");
    setSelectedCode("1");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function switchMode(mode) {
    setScanMode(mode);
    setError("");
    setScanMessage("");
    setResult(null);
  }

  function getPlasticFromResponse(data) {
    return (
      data?.plastic ||
      data?.suggestedPlastic ||
      data?.result?.plastic ||
      null
    );
  }

  /* IMAGE UPLOAD */

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must not exceed 5 MB.");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setPlastic(null);
    setError("");
    setScanMessage("");
  }

  /* MANUAL SCAN */

  async function handleManualScan(code = selectedCode) {
    setLoading(true);
    setError("");
    setScanMessage("");
    setResult(null);
    setPlastic(null);

    try {
      const response = await fetch(`${API_URL}/api/scan/manual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: Number(code) }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Manual identification failed.");
      }

      const identified = getPlasticFromResponse(data);

      if (!identified) {
        throw new Error(
          data.message || "The backend did not return plastic information."
        );
      }

      setSelectedCode(String(code));
      setResult(data);
      setPlastic(identified);
      setScanMessage("Manual resin-code identification completed.");
      goToPortal("info");
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Check that the backend is running on port 5000."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  /* IMAGE SCAN */

  async function handleImageScan() {
    if (!selectedFile) {
      setError("Please upload an image of your plastic bottle first.");
      return;
    }

    setLoading(true);
    setError("");
    setScanMessage("");
    setResult(null);
    setPlastic(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(`${API_URL}/api/scan/image`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Image scanning failed.");
      }

      setResult(data);

      const identified = getPlasticFromResponse(data);

      if (identified) {
        setPlastic(identified);
        setScanMessage("Plastic material identified from the scan.");
        goToPortal("info");
      } else if (
        data.candidates &&
        data.candidates.length > 0
      ) {
        setScanMessage(
          "Multiple possible numbers detected. Confirm the correct resin code below."
        );
      } else {
        setScanMessage(
          data.message ||
          "No clear resin code was detected. Try another image or use manual scanning."
        );
      }
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Check that the backend is running on port 5000."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  const hasCandidates =
    result?.method === "image" &&
    !plastic &&
    Array.isArray(result?.candidates) &&
    result.candidates.length > 0;

  const noCandidates =
    result?.method === "image" &&
    !plastic &&
    (!result?.candidates || result.candidates.length === 0);

  const currentPortalLabel =
    portals.find((portal) => portal.id === currentPortal)?.label || "HOME";

  return (
    <main className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>

      {/* BACKGROUND DECORATION */}
      <div className="ambient-glow glow-one" />
      <div className="ambient-glow glow-two" />

      {/* NAVIGATION */}
      <header className="navbar">
        <button
          className="logo"
          onClick={() => goToPortal("home")}
          aria-label="Go to home portal"
        >
          PLASTIC<span>WISE.</span>
        </button>

        <nav className="nav-links">
          {portals.map((portal) => (
            <button
              key={portal.id}
              className={currentPortal === portal.id ? "active" : ""}
              onClick={() => goToPortal(portal.id)}
            >
              <span>{portal.number}</span>
              {portal.label}
            </button>
          ))}
        </nav>

        <button
          className="theme-button"
          onClick={() => setDarkMode((previous) => !previous)}
        >
          {darkMode ? "☼ LIGHT MODE" : "◐ DARK MODE"}
        </button>
      </header>

      {/* PORTAL PROGRESS */}
      <div className="portal-progress">
        <span>{currentPortalLabel}</span>
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            animate={{
              width: `${((currentIndex + 1) / portals.length) * 100}%`,
            }}
            transition={{ duration: 0.45 }}
          />
        </div>
        <span>
          {String(currentIndex + 1).padStart(2, "0")} / 05
        </span>
      </div>

      {/* SLIDING PORTALS */}
      <div className="portal-stage">
        <AnimatePresence
          initial={false}
          mode="wait"
          custom={direction}
        >
          <motion.section
            key={currentPortal}
            className={`portal portal-${currentPortal}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >

            {/* HOME PORTAL */}
            {currentPortal === "home" && (
              <div className="portal-inner home-layout">
                <div className="home-copy">
                  <p className="eyebrow">
                    [ ENVIRONMENTAL INTELLIGENCE / PROJECT 001 ]
                  </p>

                  <h1>
                    KNOW YOUR
                    <br />
                    <span>PLASTIC.</span>
                    <br />
                    CHANGE
                    <br />
                    YOUR REALITY.
                  </h1>

                  <p className="home-description">
                    Every bottle has a story. Identify its material,
                    understand its characteristics and discover
                    how to make more responsible choices.
                  </p>

                  <div className="home-actions">
                    <button
                      className="primary-button"
                      onClick={() => goToPortal("scanner")}
                    >
                      ENTER SCANNER <span>↗</span>
                    </button>

                    <button
                      className="secondary-button"
                      onClick={() => goToPortal("impact")}
                    >
                      EXPLORE THE IMPACT
                    </button>
                  </div>

                  <div className="home-credit">
                    A PROJECT BY <strong>ECOGENIX</strong>
                  </div>
                </div>

                <div className="home-visual">
                  <div className="bottle-caption caption-one">
                    <span className="caption-dot" />
                    MATERIAL ANALYSIS
                    <small>POLYMER / DETECTION</small>
                  </div>

                  <div className="bottle-canvas">
                    <BottleScene />
                  </div>

                  <div className="bottle-caption caption-two">
                    <span className="caption-dot" />
                    RESIN IDENTIFICATION
                    <small>CLASSIFICATION / 01—07</small>
                  </div>

                  <div className="bottle-index">
                    <span>OBJECT 001</span>
                    <span>INTERACTIVE 3D MODEL</span>
                  </div>
                </div>
              </div>
            )}

            {/* SCANNER PORTAL */}
            {currentPortal === "scanner" && (
              <div className="portal-inner scanner-layout">
                <div className="portal-heading">
                  <div>
                    <p className="eyebrow">
                      [ 002 — PLASTICWISE IDENTIFICATION SYSTEM ]
                    </p>
                    <h1>
                      YOUR PLASTIC.
                      <br />
                      <span>IDENTIFIED.</span>
                    </h1>
                    <p className="portal-description">
                      Upload a picture of your bottle or manually
                      select its resin identification code.
                    </p>
                  </div>

                  <div className="system-status">
                    <span className="status-dot" />
                    SYSTEM ONLINE
                    <small>SCANNER / 01—07</small>
                  </div>
                </div>

                <div className="scanner-workspace">
                  <div className="scanner-panel">
                    <div className="scanner-tabs">
                      <button
                        className={scanMode === "image" ? "active" : ""}
                        onClick={() => switchMode("image")}
                      >
                        01 / IMAGE SCAN
                      </button>

                      <button
                        className={scanMode === "manual" ? "active" : ""}
                        onClick={() => switchMode("manual")}
                      >
                        02 / MANUAL CODE
                      </button>
                    </div>

                    {scanMode === "image" ? (
                      <div className="scan-content">
                        <p className="technical-label">
                          IMAGE RECOGNITION / OCR
                        </p>
                        <h2>UPLOAD YOUR BOTTLE.</h2>
                        <p className="scan-description">
                          Take a clear picture of the recycling
                          identification symbol printed on your bottle.
                        </p>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleFileChange}
                          hidden
                        />

                        <button
                          type="button"
                          className={`upload-area ${preview ? "has-preview" : ""}`}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {preview ? (
                            <img
                              src={preview}
                              alt="Selected plastic bottle"
                              className="image-preview"
                            />
                          ) : (
                            <>
                              <span className="upload-icon">↑</span>
                              <strong>CHOOSE AN IMAGE</strong>
                              <span>JPG / PNG / WEBP · MAX 5 MB</span>
                            </>
                          )}
                        </button>

                        {selectedFile && (
                          <p className="selected-file">
                            SELECTED: {selectedFile.name}
                          </p>
                        )}

                        <button
                          className="scan-action"
                          onClick={handleImageScan}
                          disabled={loading}
                        >
                          {loading ? "ANALYSING IMAGE..." : "IDENTIFY MY PLASTIC ↗"}
                        </button>

                        <p className="scanner-footnote">
                          OCR suggests possible matches. Always verify
                          the resin code before confirmation.
                        </p>
                      </div>
                    ) : (
                      <div className="scan-content">
                        <p className="technical-label">
                          MANUAL IDENTIFICATION / RIC
                        </p>
                        <h2>SELECT YOUR RESIN CODE.</h2>
                        <p className="scan-description">
                          Find the number inside the recycling triangle
                          on your bottle and select it below.
                        </p>

                        <div className="resin-grid">
                          {resinCodes.map((item) => (
                            <button
                              key={item.code}
                              className={`resin-option ${
                                selectedCode === String(item.code)
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => {
                                setSelectedCode(String(item.code));
                                setError("");
                              }}
                            >
                              <strong>{item.code}</strong>
                              <span>{item.name}</span>
                            </button>
                          ))}
                        </div>

                        <button
                          className="scan-action"
                          onClick={() => handleManualScan()}
                          disabled={loading}
                        >
                          {loading ? "IDENTIFYING..." : "IDENTIFY MY PLASTIC ↗"}
                        </button>

                        <p className="scanner-footnote">
                          Select the code printed on the actual product.
                          Do not guess based on appearance alone.
                        </p>
                      </div>
                    )}

                    {error && (
                      <div className="message error-message">
                        <strong>SCAN ERROR</strong>
                        <p>{error}</p>
                      </div>
                    )}

                    {scanMessage && (
                      <div className="message">
                        <p>{scanMessage}</p>
                      </div>
                    )}

                    {hasCandidates && (
                      <div className="candidate-panel">
                        <p className="technical-label">
                          POSSIBLE OCR MATCHES
                        </p>
                        <h3>VERIFY YOUR RESIN CODE.</h3>
                        <p>
                          Multiple numbers were detected. Select the
                          number that appears inside your bottle's
                          recycling symbol.
                        </p>

                        <div className="candidate-buttons">
                          {result.candidates.map((code) => (
                            <button
                              key={code}
                              onClick={() => handleManualScan(String(code))}
                              disabled={loading}
                            >
                              CONFIRM CODE {code} ↗
                            </button>
                          ))}
                        </div>

                        <small>
                          OCR confidence: {result.ocrConfidence ?? 0}%.
                          These are suggestions, not verified identifications.
                        </small>
                      </div>
                    )}

                    {noCandidates && (
                      <div className="message">
                        <strong>NO CLEAR CODE DETECTED.</strong>
                        <p>
                          Try a clearer image or switch to manual scanning.
                        </p>
                        <button
                          className="text-button"
                          onClick={() => switchMode("manual")}
                        >
                          USE MANUAL SCANNING ↗
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="scanner-side">
                    <div className="scanner-orbit">
                      <div className="orbit-ring ring-one" />
                      <div className="orbit-ring ring-two" />
                      <div className="orbit-ring ring-three" />
                      <div className="scanner-core">
                        <span>PW</span>
                        <small>IDENTIFY</small>
                      </div>
                      <div className="orbit-dot" />
                    </div>

                    <div className="scanner-side-info">
                      <span>RESIN CATEGORIES</span>
                      <strong>07</strong>
                      <small>AVAILABLE CLASSIFICATIONS</small>
                    </div>

                    <div className="scanner-side-note">
                      <span className="status-dot" />
                      MATERIAL INTELLIGENCE SYSTEM
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* IDENTIFICATION PORTAL */}
            {currentPortal === "info" && (
              <div className="portal-inner info-layout">
                <div className="portal-heading">
                  <div>
                    <p className="eyebrow">
                      [ 003 — MATERIAL PROFILE ]
                    </p>
                    <h1>
                      THE MATERIAL
                      <br />
                      <span>BEHIND IT.</span>
                    </h1>
                    <p className="portal-description">
                      Your scan results and material information.
                    </p>
                  </div>

                  <div className="system-status">
                    <span className="status-dot" />
                    IDENTIFICATION
                    <small>PROFILE / DETAILS</small>
                  </div>
                </div>

                {plastic ? (
                  <>
                    <div className="profile-card">
                      <div className="profile-identity">
                        <span className="profile-code">
                          {plastic.code ?? selectedCode}
                        </span>
                        <div>
                          <p className="technical-label">
                            RESIN IDENTIFICATION CODE
                          </p>
                          <h2>
                            {plastic.name || "Plastic material"}
                          </h2>
                          <p className="profile-abbreviation">
                            {plastic.abbreviation || ""}
                          </p>
                        </div>
                      </div>

                      <div className="profile-confirmation">
                        <span className="status-dot" />
                        PROFILE RETRIEVED
                        <small>
                          {result?.method === "image"
                            ? "IMAGE SCAN"
                            : "MANUAL IDENTIFICATION"}
                        </small>
                      </div>
                    </div>

                    <div className="information-grid">
                      <article className="information-card">
                        <span>01 / COMMON USES</span>
                        {renderInformation(plastic.commonUses)}
                      </article>

                      <article className="information-card">
                        <span>02 / CHARACTERISTICS</span>
                        {renderInformation(plastic.characteristics)}
                      </article>

                      <article className="information-card">
                        <span>03 / REUSE GUIDANCE</span>
                        {renderInformation(plastic.reuseGuidance)}
                      </article>

                      <article className="information-card">
                        <span>04 / RECYCLING GUIDANCE</span>
                        {renderInformation(plastic.recyclingGuidance)}
                      </article>

                      <article className="information-card wide-card">
                        <span>05 / ENVIRONMENTAL CONSIDERATIONS</span>
                        {renderInformation(plastic.environmentalConsiderations)}
                      </article>
                    </div>

                    {plastic.importantNote && (
                      <div className="important-note">
                        <strong>IMPORTANT NOTE</strong>
                        <p>{plastic.importantNote}</p>
                      </div>
                    )}

                    <div className="portal-actions">
                      <button
                        className="secondary-button"
                        onClick={() => {
                          resetScanner();
                          goToPortal("scanner");
                        }}
                      >
                        ↺ SCAN ANOTHER BOTTLE
                      </button>

                      <button
                        className="primary-button"
                        onClick={() => goToPortal("impact")}
                      >
                        EXPLORE THE IMPACT ↗
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty-profile">
                    <div className="empty-icon">?</div>
                    <h2>NO MATERIAL PROFILE YET.</h2>
                    <p>
                      Scan a bottle or manually select a resin code
                      to view its identification details here.
                    </p>
                    <button
                      className="primary-button"
                      onClick={() => goToPortal("scanner")}
                    >
                      OPEN SCANNER ↗
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* IMPACT PORTAL */}
            {currentPortal === "impact" && (
              <div className="portal-inner impact-layout">
                <div className="portal-heading">
                  <div>
                    <p className="eyebrow">
                      [ 004 — BEYOND THE BOTTLE ]
                    </p>
                    <h1>
                      UNDERSTAND.
                      <br />
                      <span>MAKE AN IMPACT.</span>
                    </h1>
                    <p className="portal-description">
                      Knowing the material is only the beginning.
                      Responsible decisions make the difference.
                    </p>
                  </div>
                </div>

                <div className="impact-grid">
                  {[
                    {
                      number: "01",
                      title: "IDENTITY",
                      text: "Understand the different types of plastic and their common applications.",
                    },
                    {
                      number: "02",
                      title: "RESPONSIBLE USE",
                      text: "Learn about intended use, reuse limitations and responsible handling.",
                    },
                    {
                      number: "03",
                      title: "ENVIRONMENT",
                      text: "Explore the environmental considerations associated with plastic waste.",
                    },
                    {
                      number: "04",
                      title: "RECYCLING",
                      text: "Discover recycling pathways and why correct sorting matters.",
                    },
                  ].map((item) => (
                    <motion.article
                      className="impact-card"
                      key={item.number}
                      whileHover={{ y: -7 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span>{item.number} / 04</span>
                      <h2>{item.title}</h2>
                      <p>{item.text}</p>
                      <div className="impact-card-line" />
                    </motion.article>
                  ))}
                </div>

                <div className="impact-note">
                  <span>PLASTICWISE PRINCIPLE</span>
                  <p>
                    A resin identification code tells you the type of
                    resin category. It does not, by itself, guarantee
                    that an item is accepted by your local recycling
                    programme or that it is safe for every reuse.
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => goToPortal("team")}
                >
                  MEET THE TEAM ↗
                </button>
              </div>
            )}

            {/* TEAM PORTAL */}
            {currentPortal === "team" && (
              <div className="portal-inner team-layout">
                <div className="portal-heading team-heading">
                  <div>
                    <p className="eyebrow">
                      [ 005 — THE PEOPLE BEHIND THE PROJECT ]
                    </p>
                    <h1>
                      MEET THE
                      <br />
                      <span>TEAM.</span>
                    </h1>
                    <p className="portal-description">
                      Innovation begins with people who believe
                      in making a difference.
                    </p>
                  </div>

                  <div className="team-brand">
                    <span>OUR TEAM</span>
                    <h2>ECOGENIX</h2>
                    <p>INNOVATION • TECHNOLOGY • SUSTAINABILITY</p>
                  </div>
                </div>

                <div className="team-grid">
                  {teamMembers.map((member, index) => (
                    <motion.article
                      className="team-card"
                      key={member}
                      initial={{ opacity: 0, y: 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.025,
                      }}
                    >
                      <span>MEMBER / 0{index + 1}</span>
                      <h3>{member}</h3>
                      <div className="team-card-decoration" />
                    </motion.article>
                  ))}
                </div>

                <div className="team-footer">
                  <span>BUILT WITH PURPOSE.</span>
                  <strong>BUILT BY ECOGENIX.</strong>
                </div>

                <button
                  className="secondary-button"
                  onClick={() => goToPortal("home")}
                >
                  ↺ BACK TO HOME
                </button>
              </div>
            )}

          </motion.section>
        </AnimatePresence>
      </div>

      {/* BOTTOM PORTAL CONTROLS */}
      <footer className="portal-controls">
        <button
          className="portal-control-button"
          onClick={goBack}
          disabled={currentIndex === 0}
        >
          <span>←</span> BACK
        </button>

        <div className="portal-dots">
          {portals.map((portal, index) => (
            <button
              key={portal.id}
              className={currentPortal === portal.id ? "active" : ""}
              onClick={() => goToPortal(portal.id)}
              aria-label={`Go to ${portal.label}`}
              title={portal.label}
            />
          ))}
        </div>

        <button
          className="portal-control-button next-control"
          onClick={goNext}
          disabled={currentIndex === portals.length - 1}
        >
          NEXT <span>→</span>
        </button>
      </footer>
    </main>
  );
}
