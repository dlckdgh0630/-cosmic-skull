# 🦴 Cosmic Skull – 실행 가이드

## 폴더 구조
```
cosmic-skull/
├── index.html
├── style.css
├── main.js
└── models/
    └── skull_model.obj   ← 여기에 .obj 파일 넣기!
```

## 실행 방법 (VS Code + Live Server)
1. `skull_model.obj` 파일을 `models/` 폴더에 복사
2. VS Code에서 `cosmic-skull` 폴더 열기
3. Extensions에서 **Live Server** 설치 (이미 있으면 건너뜀)
4. `index.html` 우클릭 → **Open with Live Server**
5. 브라우저에서 카메라 권한 **허용**

## 손 제어 방법

### 오른손
| 동작 | 기능 |
|------|------|
| 손 좌우 기울기 | 해골 Y축 회전 |
| 손 가까이 | 해골 확대 |
| 손 멀리 | 해골 축소 |
| ✊ 주먹 | 파티클 폭발! |
| 🖐 손 펼침 | 천천히 복구 |

### 왼손 (손가락 수)
| 손가락 수 | 기능 |
|-----------|------|
| 0 (주먹) | 기본 색상 |
| 1개 | 🔥 파이어 모드 |
| 2개 | 👻 고스트 모드 (눈 불) |
| 3개 | 💫 해골 흔들기 |

## 트러블슈팅
- **해골이 안 보임** → `models/skull_model.obj` 경로 확인
- **손 인식 안 됨** → 브라우저 카메라 권한 허용 확인 (주소창 자물쇠 클릭)
- **느림** → Chrome 권장, 다른 탭 닫기
