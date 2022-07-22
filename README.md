## **PLUSPLUS** <img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F66bb89d3-3f07-4e89-bdce-e3fb0c785174%2FUntitled.png?table=block&id=7f79d739-38ac-48ed-bded-99d756beda87&spaceId=c3aa8e4b-2a93-4a9a-aa2a-1781cca6f89b&width=2000&userId=44c0293a-2449-4194-944a-7d3176a94e23&cache=v2" width="100">



<br>

### 서비스 링크 : [PLUSPLUS](http://kdt-sw2-seoul-team01.elicecoding.com/)

### **서비스 설명**
> 이 프로젝트는 호텔 서비스를 검색, 조회, 그리고 예약할 수 있는 웹 서비스입니다.

### 기획 의도, 목적
---
> 요즘 사회에서는 '혼밥', '혼술' 등 홀로 무언가를 하는 사람들이 확산세를 보이고 있습니다. <br/>
 혼자 문화 생활을 한다는 것이 더 이상 낯설지 않고, 대중 매체에서도 관련 컨텐츠가 다뤄지고 있습니다.<br/>
 저희 1팀에서는 그러한 나홀로 문화를 지향하는 고객을 대상으로  호텔 예약 웹 서비스를 기획하게 되었습니다. <br/>
 방 종류, 예약 형식도 1인을 기준으로 디자인 되었고, 혼자서 여행을 왔지만 새로운 인연을 만나고 싶어하는 고객을 위해 알맞는 스테이 유형도 준비했습니다.

### 주요 기능
---
1. 카카오/네이버 소셜 로그인
2. 회원 정보
    - 회원 정보 수정
    - 좋아요(찜) 기능
    - 예약 목록 조회
3. 방 검색 기능
    - 캘린더 필터
    - 테마, 스테이 유형, 지역 필터
4. 방 정보 조회
5. 방 예약 기능


### 사용 스택
---
#### 프론트엔드
> ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
> ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
> ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
> ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
> ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

#### 백엔드
> ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
> ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
> ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
> ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
> ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
> ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

### 서비스 기획
> 프로젝트 구조 [구조 링크](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c3b8f225-d422-4fa0-93cc-6c9884aa60b3/plusplus%EA%B5%AC%EC%A1%B0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220722%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220722T113853Z&X-Amz-Expires=86400&X-Amz-Signature=4017a8fcbcf809caebb5fa8460591cb8b3c8e6e33c3c85221ef38db3b7376492&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22plusplus%25EA%25B5%25AC%25EC%25A1%25B0.png%22&x-id=GetObject)

### 협업 툴

| 툴 | 사용 이유 | 
| ------ | ------ |
| [figma](https://www.figma.com/file/RyTmflN3MdG9UrtAXsktg8/plusplus)     | 기획과 와이어프레임 작성   |
| [notion](https://gigantic-paint-f2a.notion.site/1-a2c35e3c8c9b4355b5e80c37d95f8c69)   | 회의록, 기획안 등 문서화 작업 |
| discord  | 소통과 git hook 사용  |
| gathertown  | 온라인 회의 |

### 구성원 역할

| 이름 | 역할 | 구현 기능 | 
| ------ | ------ | ------ |
| 박승준    |  팀장, 프론트엔드  | header, 관리자 페이지, 유저 리스트, 숙소 리스트 페이지  |
| 정유진   | 프론트엔드    | footer, 메인페이지, 로그인 페이지, 검색 페이지, 숙소 상세 페이지  |
| 이용준   | 프론트엔드    |  캘린더 modal, 방 상세 페이지, 상품 결제 페이지, 마이페이지, |
| 김지호  | 백엔드        | 유저, 주문, Oauth, 로그인 API,배포 |
| 나혜지 | 백엔드 | 검색 필터링, 숙소, 방, 날짜별 예약현황 조회, 카테고리, 테마, 찜, 이벤트, 이미지 업로드 API|

