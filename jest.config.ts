export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.app.json", // tsconfig.app.json 경로를 명시적으로 지정
      },
    ],
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/test/__mock__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1", // TypeScript의 paths와 일치
    "\\.(css|scss|sass)$": "identity-obj-proxy", // CSS 모듈 처리
  },
  rootDir: ".",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // 루트 디렉토리 기준으로 경로 수정
};
