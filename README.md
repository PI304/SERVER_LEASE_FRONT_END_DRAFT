# 👾 SERVER_LEASE_FRONT_END_DRAFT

## How to run

1. 이 프로젝트를 클론합니다.
2. VsCode 전역 settings.json에 다음 줄을 추가하여 Live Server가 3000번 포트로 열리게 해줍니다. (CORS 관련)
   <br/>
   <img width="270" alt="Screen Shot 2023-02-01 at 8 35 18 AM" src="https://user-images.githubusercontent.com/98504939/215908090-f57b33e6-9728-40db-a182-51a567692e99.png">
3. Live Server로 board.html을 열어줍니다.
4. 주소창의 127.0.0.1을 localhost로 변경해주세요. (CORS 관련)
   <br/>
   <img width="228" alt="Screen Shot 2023-02-01 at 8 37 26 AM" src="https://user-images.githubusercontent.com/98504939/215908338-f8bede94-a548-446c-8288-84dc95c117fd.png">

## 전제

태그로 게시판 솔루션을 제공하기 위해서는

1. 특정 게시판에 작성된 게시글들의 메타 정보를 나열한 게시판 태그
2. 특정 게시글의 내용을 보여주는 게시글 태그

크게 봤을 때 단 두가지의 태그가 필요하다는 가정에서 시작했습니다.

## 사용방법

솔루션이 제공한 index.js를 html에 불러온 후, 다음의 두가지 규칙을 지켜 태그를 작성합니다.

1. 솔루션이 요구하는 dataset을 태그에 전달합니다.
2. 데이터가 그려지기를 바라는 곳에 정해진 형식을 지켜 치환자를 작성합니다.
   - 게시판 치환자 형식 - {{ %% BOARD_POST_컬럼명 %% }}
   - 게시글 치환자 형식 - {{ %% VIEW_POST_컬럼명 %% }}

## 공통

SPA에 적합한 방식으로 구상했습니다.  
로직에 필요한 값들을 바깥에서 전달하고 동적으로 변경할 수 있습니다.

사용자가 태그 사이에 작성한 innerHtml이 템플릿으로 설정됩니다.  
{{ %% ... %% }} 이 상응하는 데이터로 대체되는 방식입니다.

외부에서 스타일이나 레이아웃을 수정하는 것이 완전히 자유롭습니다.

## server-lease-board

사용자는 게시판의 id와 page를 전달합니다.  
솔루션은 해당 게시판, 해당 페이지의 게시글들을 불러와 주어진 템플릿에 대해 반복합니다.  
다음은 html에서 사용한 예시입니다.

- data-board-page는 스크립트를 이용해 쿼리스트링에 따라 동적으로 바꿔주었습니다. (SPA 테스팅)

### 사용 예시

<img width="685" alt="Screen Shot 2023-02-01 at 8 27 15 AM" src="https://user-images.githubusercontent.com/98504939/215907099-fa404028-24f3-4b60-b063-78cf2154875d.png">

### 처리 결과

<img width="579" alt="Screen Shot 2023-02-01 at 8 48 56 AM" src="https://user-images.githubusercontent.com/98504939/215909765-31ed7a5a-77cb-4851-8c38-3ead06855ae3.png">

### 결과 화면

<img width="156" alt="Screen Shot 2023-02-01 at 8 29 45 AM" src="https://user-images.githubusercontent.com/98504939/215907384-dce5c1ba-102f-4940-bafc-6c711f52e48c.png">

## server-lease-view

사용자는 게시판의 id와 게시글의 id를 전달합니다.  
솔루션은 해당 게시판, 해당 게시글의 데이터를 불러와 주어진 템플릿에 주입합니다.  
다음은 html에서 사용한 예시입니다.

- data-view-id는 스크립트를 이용해 쿼리스트링에 따라 동적으로 바꿔주었습니다. (SPA 테스팅)

### 사용 예시

<img width="449" alt="Screen Shot 2023-02-01 at 8 30 35 AM" src="https://user-images.githubusercontent.com/98504939/215907488-bfc58176-9365-415f-b5c2-a8937c7d8d3f.png">

### 처리 결과

<img width="545" alt="Screen Shot 2023-02-01 at 8 31 08 AM" src="https://user-images.githubusercontent.com/98504939/215907575-11bd7244-ce97-4020-922b-99027dde3156.png">

### 결과 화면

<img width="109" alt="Screen Shot 2023-02-01 at 8 31 39 AM" src="https://user-images.githubusercontent.com/98504939/215907672-596af39a-38c7-434d-93eb-0b48cc88269f.png">
