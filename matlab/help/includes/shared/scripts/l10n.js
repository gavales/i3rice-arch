// Copyright 2013 MathWorks, Inc.

function StringMap() {
    this.strings = {
        en: {
            click_to_collapse:'Click to Collapse',
            click_to_expand:'Click to Expand',
            back_to_top_of_page:'Back to Top of Page',
            back_to_top_of_section:'Back to Top of Section',
            yes:'Yes',
            no:'No',
            was_this_topic_helpful:'Was this topic helpful?',
            expand_all:'expand all',
            expand_all_in_page:'expand all in page',
            collapse_all:'collapse all',
            collapse_all_in_page:'collapse all in page',
            play:'Play',
            stop:'Stop',
            search_suggestions:'Search Suggestions',
            next: 'Next',
            previous: 'Previous',
            acknowledgments: 'Acknowledgments',
            trademarks: 'Trademarks',
            patents: 'Patents',
            terms_of_use: 'Terms of Use',
            search_results: 'Search Results',
            remove_facet_nuggets: 'Remove:',
            remove_all_facet_nuggets: 'Remove All',
            "Open Script": 'Open Script',
            "Open Live Script": 'Open Live Script',
            "Open Model": 'Open Model',
            "Open App": 'Open App',
            "Open Example": 'Open Example',
            "View more MATLAB Examples": 'View more<br>MATLAB Examples',
            "View more Simulink Examples": 'View more<br>Simulink Examples'
        },
        ja_JP: {
            click_to_collapse:'クリックして折りたたむ',
            click_to_expand:'クリックして展開する',
            back_to_top_of_page:'ページのトップへ',
            back_to_top_of_section:'セクションのトップへ',
            yes:'はい',
            no:'いいえ',
            was_this_topic_helpful:'<span style=\"font-size:1.2em\">この情報は役に立ちましたか?</span>',
            expand_all:'すべて展開する',
            expand_all_in_page:'ページ内をすべて展開する',
            collapse_all:'すべて折りたたむ',
            collapse_all_in_page:'ページ内をすべて折りたたむ',
            play:'再生',
            stop:'停止',
            search_suggestions:'検索文字列の候補',
            next: '次へ',
            previous: '前へ',
            acknowledgments: '謝辞 (英語)',
            trademarks: '商標 (英語)',
            patents: '特許 (英語)',
            terms_of_use: 'ご利用条件 (英語)',
            search_results: '検索結果',
            remove_facet_nuggets: '削除：',
            remove_all_facet_nuggets: 'すべて削除',
            "Open Script": 'スクリプトを開く',
            "Open Live Script": 'ライブ スクリプトを開く',
            "Open Model": 'モデルを開く',
            "Open App": 'アプリを開く',
            "Open Example": '例を開く',
            "View more MATLAB Examples": 'MATLAB の例を<br>さらに表示',
            "View more Simulink Examples": 'Simulink の例を<br>さらに表示'
        },
        ko_KR: {
            click_to_collapse:'축소하려면 클릭하십시오',
            click_to_expand:'확장하려면 클릭하십시오',
            back_to_top_of_page:'페이지 맨 위로 돌아가기',
            back_to_top_of_section:'섹션 맨 위로 돌아가기',
            yes:'예',
            no:'아니요',
            was_this_topic_helpful:'이 항목이 도움이 되셨습니까?',
            expand_all:'모두 확장',
            expand_all_in_page:'페이지 내 모두 확장',
            collapse_all:'모두 축소',
            collapse_all_in_page:'페이지 내 모두 축소',
            play:'재생',
            stop:'중지',
            search_suggestions:'검색 제안',
            next: '다음',
            previous: '이전',
            acknowledgments: '감사',
            trademarks: '상표',
            patents: '특허',
            terms_of_use: '사용 약관',
            search_results: '검색 결과',
            remove_facet_nuggets: '지우기:',
            remove_all_facet_nuggets: '모두 지우기',
            "Open Script": '스크립트 열기',
            "Open Live Script": '라이브 스크립트 열기',
            "Open Model": '모델 열기',
            "Open App": '앱 열기',
            "Open Example": '예제 열기',
            "View more MATLAB Examples": 'MATLAB 예제<br>더 보기',
            "View more Simulink Examples": 'Simulink 예제<br>더 보기'
        },
        zh_CN: {
            click_to_collapse:'点击以折叠',
            click_to_expand:'点击以展开',
            back_to_top_of_page:'返回页首',
            back_to_top_of_section:'返回节首',
            yes:'是',
            no:'否',
            was_this_topic_helpful:'<span style=\"font-size:1.2em\">本主题对您是否有帮助？</span>',
            expand_all:'全部展开',
            expand_all_in_page:'全页展开',
            collapse_all:'全部折叠',
            collapse_all_in_page:'全页折叠',
            play:'播放',
            stop:'停止',
            search_suggestions:'﻿搜索建议',
            next: '下一页',
            previous: '上一页',
            acknowledgments: '致谢',
            trademarks: '商标',
            patents: '专利',
            terms_of_use: '使用条款',
            search_results: '搜索结果',
            remove_facet_nuggets: '删除：',
            remove_all_facet_nuggets: '全部删除',
            "Open Script": '打开脚本',
            "Open Live Script": '打开实时脚本',
            "Open Model": '打开模型',
            "Open App": '打开 App',
            "Open Example": '打开示例',
            "View more MATLAB Examples": '查看更多<br>MATLAB 示例',
            "View more Simulink Examples": '查看更多<br>Simulink 示例'
        }
    };

    this.strings['ja'] = this.strings['ja_JP'];
    this.strings['ko'] = this.strings['ko_KR'];
    this.strings['zh'] = this.strings['zh_CN'];

    this.getLocalizedString = function(lang, str) {
        return this.strings[lang][str];
    };
}

function getPageLanguage() {
    var localeEl = $("#doc_center_content");
    if (localeEl.length === 0) {
        localeEl = $("#docsearch_form");
        return localeEl.attr('data-language');
    } else {
        return localeEl.attr('lang');
    }
}

function getLocalizedString(str, locale) {
    var lang = locale ? locale : getPageLanguage() || 'en';
    var sMap = new StringMap();
    return sMap.getLocalizedString(lang, str);
}