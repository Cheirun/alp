import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(newParticles);
  }, []);

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

const handleLaunch = () => {
  if (!userType) {
    alert('🚀 Please select your mission type to launch!');
    return;
  }

  setIsLoading(true);

  setTimeout(() => {
    if (userType === 'child') {
      navigate('/child-dashboard');
    } else if (userType === 'therapist') {
      navigate('/therapist-dashboard');
    }
    setIsLoading(false);
  }, 2500);
};


  return (
    <div
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(126, 87, 240, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
        `,
        fontFamily: "'Inter', 'Poppins', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
      }}
    >
      {/* Animated Particle Background */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'linear-gradient(45deg, #00d4ff, #7c3aed, #f59e0b)',
              borderRadius: '50%',
              opacity: particle.opacity,
              animation: `floatParticle ${particle.speed + 8}s linear infinite`,
              boxShadow: '0 0 10px rgba(124, 58, 237, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Geometric Background Elements */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '200px',
            height: '200px',
            background: 'linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(124, 58, 237, 0.1))',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'morphShape 8s ease-in-out infinite',
            filter: 'blur(1px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '15%',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(45deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1))',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            animation: 'morphShape 6s ease-in-out infinite reverse',
            filter: 'blur(1px)',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left Side - Futuristic Login Form */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '60px 45px',
              borderRadius: '25px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
              width: '100%',
              maxWidth: '480px',
              textAlign: 'center',
              animation: 'glassSlideIn 1s ease-out',
              position: 'relative',
            }}
          >
            {/* Holographic Border Effect */}
            <div
              style={{
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                background: 'linear-gradient(45deg, #00d4ff, #7c3aed, #f59e0b, #00d4ff)',
                borderRadius: '25px',
                zIndex: -1,
                animation: 'holoBorder 3s linear infinite',
                opacity: 0.6,
              }}
            />

            {/* Logo Section */}
            <div style={{ marginBottom: '40px' }}>
              <div
                style={{
                  fontSize: '52px',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '15px',
                  animation: 'logoGlow 2s ease-in-out infinite alternate',
                  textShadow: '0 0 30px rgba(124, 58, 237, 0.5)',
                  letterSpacing: '2px',
                }}
              >
                ADAPTIX
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '18px',
                  marginBottom: '8px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                }}
              >
                SMART LEARNING PLATFORM
              </div>
              <div
                style={{
                  color: 'rgba(0, 212, 255, 0.8)',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  marginBottom: '20px',
                }}
              >
                [ PERSONALIZED • INTERACTIVE • FUN.LEARNING ]
              </div>
            </div>

            {/* Mission Selection */}
            <div style={{ margin: '45px 0' }}>
              <h3
                style={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '30px',
                  fontSize: '22px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                SELECT MISSION TYPE
              </h3>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '25px',
                }}
              >
                {/* Child Explorer Card */}
                <div
                  onClick={() => setUserType('child')}
                  style={{
                    flex: 1,
                    background:
                      userType === 'child'
                        ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(124, 58, 237, 0.3))'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    backdropFilter: 'blur(10px)',
                    border:
                      userType === 'child'
                        ? '2px solid rgba(0, 212, 255, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '25px 20px',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: userType === 'child' ? 'scale(1.05) translateY(-5px)' : 'scale(1)',
                    boxShadow:
                      userType === 'child'
                        ? '0 20px 40px rgba(0, 212, 255, 0.2), 0 0 20px rgba(124, 58, 237, 0.3)'
                        : '0 10px 25px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                  }}
                >
                  {userType === 'child' && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-2px',
                        left: '-2px',
                        right: '-2px',
                        bottom: '-2px',
                        background: 'linear-gradient(45deg, #00d4ff, #7c3aed)',
                        borderRadius: '20px',
                        zIndex: -1,
                        animation: 'cardGlow 2s ease-in-out infinite alternate',
                      }}
                    />
                  )}
                  <div style={{ fontSize: '50px', marginBottom: '15px' }}>🚀</div>
                  <div
                    style={{
                      fontWeight: '700',
                      color: userType === 'child' ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                      fontSize: '16px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Student
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: userType === 'child' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)',
                      marginTop: '8px',
                      fontFamily: 'monospace',
                    }}
                  >
                    [ LEARN.PLAY.DISCOVER ]
                  </div>
                </div>

                {/* Therapist Command Card */}
                <div
                  onClick={() => setUserType('therapist')}
                  style={{
                    flex: 1,
                    background:
                      userType === 'therapist'
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.3))'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    backdropFilter: 'blur(10px)',
                    border:
                      userType === 'therapist'
                        ? '2px solid rgba(16, 185, 129, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '25px 20px',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: userType === 'therapist' ? 'scale(1.05) translateY(-5px)' : 'scale(1)',
                    boxShadow:
                      userType === 'therapist'
                        ? '0 20px 40px rgba(16, 185, 129, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)'
                        : '0 10px 25px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                  }}
                >
                  {userType === 'therapist' && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-2px',
                        left: '-2px',
                        right: '-2px',
                        bottom: '-2px',
                        background: 'linear-gradient(45deg, #10b981, #3b82f6)',
                        borderRadius: '20px',
                        zIndex: -1,
                        animation: 'cardGlow 2s ease-in-out infinite alternate',
                      }}
                    />
                  )}
                  <div style={{ fontSize: '50px', marginBottom: '15px' }}>🔬</div>
                  <div
                    style={{
                      fontWeight: '700',
                      color: userType === 'therapist' ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                      fontSize: '16px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Therapist
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: userType === 'therapist' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)',
                      marginTop: '8px',
                      fontFamily: 'monospace',
                    }}
                  >
                    [ ANALYZE.GUIDE.SUPPORT ]
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <button
              onClick={handleLaunch}
              disabled={isLoading}
              style={{
                background: isLoading
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'
                  : 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #f59e0b 100%)',
                color: 'white',
                border: 'none',
                padding: '18px 50px',
                fontSize: '16px',
                fontWeight: '700',
                borderRadius: '15px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isLoading ? 'scale(0.95)' : 'scale(1)',
                boxShadow: isLoading
                  ? '0 5px 15px rgba(0, 0, 0, 0.2)'
                  : '0 15px 35px rgba(124, 58, 237, 0.4), 0 5px 15px rgba(0, 0, 0, 0.3)',
                minWidth: '250px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {!isLoading && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                    animation: 'buttonShine 3s infinite',
                  }}
                />
              )}
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid #ffffff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '12px',
                    }}
                  ></div>
                  LOADING...
                </div>
              ) : (
                `🚀 LAUNCH MISSION`
              )}
            </button>
          </div>
        </div>

        {/* Right Side - 3D Holographic Display */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div style={{ textAlign: 'center', color: 'white', position: 'relative' }}>
            {/* Main Hologram */}
            <div
              style={{
                fontSize: '150px',
                marginBottom: '30px',
                animation: 'holoFloat 4s ease-in-out infinite',
                filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.7))',
                position: 'relative',
              }}
            >
              🧠
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  border: '2px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '50%',
                  animation: 'holoRing 3s linear infinite',
                }}
              />
            </div>

            <h2
              style={{
                fontSize: '32px',
                marginBottom: '20px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                background: 'linear-gradient(135deg, #00d4ff, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SMART EMOTION LEARNING
            </h2>
            <p
              style={{
                fontSize: '18px',
                opacity: 0.9,
                fontFamily: 'monospace',
                color: 'rgba(0, 212, 255, 0.8)',
              }}
            >
              Track emotions • Personalize learning • Improve outcomes
            </p>

            {/* Floating Data Points */}
            <div style={{ position: 'absolute', top: '20%', right: '10%' }}>
              <div
                style={{
                  background: 'rgba(0, 212, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  padding: '10px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  animation: 'dataFloat 3s ease-in-out infinite',
                }}
              >
                😊 HAPPY: 87%
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '30%', left: '5%' }}>
              <div
                style={{
                  background: 'rgba(124, 58, 237, 0.2)',
                  backdropFilter: 'blur(10px)',
                  padding: '10px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  animation: 'dataFloat 3s ease-in-out infinite 1s',
                }}
              >
                🎯 FOCUS: 94%
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glassSlideIn {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes holoBorder {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes logoGlow {
          0% {
            filter: drop-shadow(0 0 5px rgba(124, 58, 237, 0.5));
          }
          100% {
            filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.8));
          }
        }

        @keyframes cardGlow {
          0% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes buttonShine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        @keyframes holoFloat {
          0%,
          100% {
            transform: translateY(0px) rotateY(0deg);
          }
          50% {
            transform: translateY(-20px) rotateY(180deg);
          }
        }

        @keyframes holoRing {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes dataFloat {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(100vh) rotate(0deg);
          }
          100% {
            transform: translateY(-10vh) rotate(360deg);
          }
        }

        @keyframes morphShape {
          0%,
          100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          25% {
            border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
          }
          50% {
            border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
          }
          75% {
            border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;


