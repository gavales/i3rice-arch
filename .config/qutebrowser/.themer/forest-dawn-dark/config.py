#                     ██            ██     
#    ████            ▒██           ▒██     
#   ██▒▒██  ██   ██ ██████  █████  ▒██     
#  ▒██ ▒██ ▒██  ▒██▒▒▒██▒  ██▒▒▒██ ▒██████ 
#  ▒▒█████ ▒██  ▒██  ▒██  ▒███████ ▒██▒▒▒██
#   ▒▒▒▒██ ▒██  ▒██  ▒██  ▒██▒▒▒▒  ▒██  ▒██
#      ▒███▒▒██████  ▒▒██ ▒▒██████ ▒██████ 
#      ▒▒▒  ▒▒▒▒▒▒    ▒▒   ▒▒▒▒▒▒  ▒▒▒▒▒   
#
# vim:ft=python
# config.load_autoconfig()

# ━  COLORS
# ━━ completion
c.colors.completion.category.bg = 'qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 #fc796b, stop:1 #fc796b)'
c.colors.completion.category.border.bottom      = '#fc796b'
c.colors.completion.category.border.top         = '#fc796b'
c.colors.completion.category.fg                 = '#3c4542'
c.colors.completion.even.bg                     = '#505956'
c.colors.completion.odd.bg                      = '#505956'
c.colors.completion.fg                          = ['#fc796b', '#fdd89a', '#78817e']
c.colors.completion.item.selected.bg            = '#fc796b'
c.colors.completion.item.selected.fg            = '#505956'
c.colors.completion.item.selected.border.bottom = '#a8cb79'
c.colors.completion.item.selected.border.top    = '#a8cb79'
c.colors.completion.match.fg                    = '#fc796b'
c.colors.completion.scrollbar.bg                = '#505956'
c.colors.completion.scrollbar.fg                = '#fdd89a'

# ━━ downloads
c.colors.downloads.bar.bg    = '#505956'
c.colors.downloads.error.bg  = '#bcbfb4'
c.colors.downloads.error.fg  = '#fdd89a'
c.colors.downloads.start.bg  = '#fc796b'
c.colors.downloads.start.fg  = '#fdd89a'
c.colors.downloads.stop.bg   = '#a8cb79'
c.colors.downloads.stop.fg   = '#fdd89a'
c.colors.downloads.system.bg = 'rgb' # rgb, hsv, hsl, none
c.colors.downloads.system.fg = 'rgb' # rgb, hsv, hsl, none

# ━━ hints
c.colors.hints.bg = 'qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 rgba(237, 192, 116, 0.8), stop:1 rgba(237, 192, 116, 0.8))'
c.colors.hints.fg          = '#fdd89a'
c.colors.hints.match.fg    = '#a8cb79'
c.colors.keyhint.bg        = 'rgba(237, 192, 116, 80%)'
c.colors.keyhint.fg        = '#fdd89a'
c.colors.keyhint.suffix.fg = '#505956'

# ━━ errors
c.colors.messages.error.bg     = '#bcbfb4'
c.colors.messages.error.border = '#bcbfb4'
c.colors.messages.error.fg     = '#fdd89a'

# ━━ info
c.colors.messages.info.bg     = '#fdd89a'
c.colors.messages.info.border = '#fdd89a'
c.colors.messages.info.fg     = '#505956'

# ━━ warning
c.colors.messages.warning.bg     = '#edc074'
c.colors.messages.warning.border = '#edc074'
c.colors.messages.warning.fg     = '#505956'

# ━━ prompts
c.colors.prompts.bg          = '#505956'
c.colors.prompts.border      = '1px solid #505956'
c.colors.prompts.fg          = '#fdd89a'
c.colors.prompts.selected.bg = '#fc796b'

# ━━ statusbar
c.colors.statusbar.caret.fg             = '#d8bbbd'
c.colors.statusbar.caret.bg             = '#505956'
c.colors.statusbar.caret.selection.fg   = '#d8bbbd'
c.colors.statusbar.caret.selection.bg   = '#505956'
c.colors.statusbar.command.fg           = '#fdd89a'
c.colors.statusbar.command.bg           = '#505956'
c.colors.statusbar.command.private.bg   = '#78817e'
c.colors.statusbar.command.private.fg   = '#fdd89a'
c.colors.statusbar.insert.fg            = '#a8cb79'
c.colors.statusbar.insert.bg            = '#505956'
c.colors.statusbar.normal.fg            = '#fc796b'
c.colors.statusbar.normal.bg            = '#505956'
c.colors.statusbar.passthrough.bg       = '#505956'
c.colors.statusbar.passthrough.fg       = '#fdd89a'
c.colors.statusbar.private.bg           = '#78817e'
c.colors.statusbar.private.fg           = '#fdd89a'
c.colors.statusbar.progress.bg          = '#fdd89a'
c.colors.statusbar.url.error.fg         = '#bcbfb4'
c.colors.statusbar.url.fg               = '#fdd89a'
c.colors.statusbar.url.hover.fg         = '#fc796b'
c.colors.statusbar.url.success.http.fg  = '#fdd89a'
c.colors.statusbar.url.success.https.fg = '#fdd89a'
c.colors.statusbar.url.warn.fg          = '#edc074'

# ━━ tabs
c.colors.tabs.bar.bg           = '#505956'
c.colors.tabs.even.bg          = '#505956'
c.colors.tabs.even.fg          = '#fdd89a'
c.colors.tabs.odd.bg           = '#505956'
c.colors.tabs.odd.fg           = '#fdd89a'
c.colors.tabs.indicator.error  = '#bcbfb4'
c.colors.tabs.indicator.start  = '#fc796b'
c.colors.tabs.indicator.stop   = '#a8cb79'
c.colors.tabs.indicator.system = 'rgb' # rgb, hsv, hsl, none
c.colors.tabs.selected.even.bg = '#fc796b'
c.colors.tabs.selected.even.fg = '#505956'
c.colors.tabs.selected.odd.bg  = '#fc796b'
c.colors.tabs.selected.odd.fg  = '#505956'

# ━  SETTINGS
# ━━ misc
c.messages.timeout = 2000
c.aliases = {
	'w': 'session-save', 'q': 'close',
	'qa': 'quit', 'wq': 'quit --save',
	'wqa': 'quit --save'
	}
c.auto_save.interval = 15000
c.auto_save.session = True
c.backend = 'webengine'
c.bindings.key_mappings = {
	'<Ctrl-[>':       '<Escape>', '<Ctrl-6>':     '<Ctrl-^>',
	'<Ctrl-M>':       '<Return>', '<Ctrl-J>':     '<Return>',
	'<Shift-Return>': '<Return>', '<Enter>':      '<Return>',
	'<Shift-Enter>':  '<Return>', '<Ctrl-Enter>': '<Ctrl-Return>'
	}
c.colors.webpage.bg = '#505956'
#c.spellcheck.languages = ['en-GB']
#		# af-ZA, bg-BG, ca-ES, cs-CZ, da-DK, de-DE, el-GR, en-AU, en-CA, en-GB,
#		# en-US, es-ES, et-EE, fa-IR, fo-FO, fr-FR, he-IL, hi-IN, hr-HR, hu-HU,
#		# id-ID, it-IT, ko, lt-LT, lv-LV, nb-NO, nl-NL, pl-PL, pt-BR, pt-PT, ro-RO,
#		# ru-RU, sh, sk-SK, sl-SI, sq, sr, sv-SE, ta-IN, tg-TG, tr-TR, uk-UA, vi-VN,

# ━━ completion
c.completion.cmd_history_max_items = 100
c.completion.delay                 = 0
c.completion.height                = '50%'
c.completion.min_chars             = 1
c.completion.open_categories       = ['searchengines', 'quickmarks', 'bookmarks', 'history']
c.completion.quick                 = True
c.completion.scrollbar.padding     = 2
c.completion.scrollbar.width       = 12
c.completion.show                  = 'always' # always, auto, never
c.completion.shrink                = False
c.completion.timestamp_format      = '%Y-%m-%d'
c.completion.use_best_match        = False
c.completion.web_history.exclude   = []
c.completion.web_history.max_items = -1

# ━━ content
c.confirm_quit                                   = ['never'] # always, multiple-tabs, downloads, never
c.content.autoplay                               = True
c.content.cache.appcache                         = True
c.content.cache.maximum_pages                    = 0
c.content.cache.size                             = None
c.content.canvas_reading                         = True
c.content.cookies.accept                         = 'all' # all, no-3rdparty, no-unknown-3rdparty, never
c.content.cookies.store                          = True
#c.content.default_encoding                       = 'iso-8859-1'
c.content.desktop_capture                        = 'ask' # true, false, ask
c.content.dns_prefetch                           = True
c.content.frame_flattening                       = False
c.content.geolocation                            = 'ask' # true, false, ask
c.content.headers.accept_language                = 'en-US,en'
#c.content.headers.custom                         = {}
c.content.headers.do_not_track                   = True
c.content.headers.referer                        = 'same-domain' # always, never, same-domain
c.content.headers.user_agent                     = None
c.content.host_blocking.enabled                  = True
c.content.host_blocking.lists     = [
	'https://www.malwaredomainlist.com/hostslist/hosts.txt',
	'http://someonewhocares.org/hosts/hosts',
	'http://winhelp2002.mvps.org/hosts.zip',
	'http://malwaredomains.lehigh.edu/files/justdomains.zip',
	'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&mimetype=plaintext'
	]
#c.content.host_blocking.whitelist                = ['piwik.org']
c.content.hyperlink_auditing                     = False
c.content.images                                 = True
c.content.javascript.alert                       = True
c.content.javascript.can_access_clipboard        = True
c.content.javascript.can_close_tabs              = True
c.content.javascript.can_open_tabs_automatically = True
c.content.javascript.enabled                     = True
c.content.javascript.log = {'unknown': 'debug', 'info': 'debug', 'warning': 'debug', 'error': 'debug'}
c.content.javascript.modal_dialog                = False
c.content.javascript.prompt                      = True
c.content.local_content_can_access_file_urls     = True
c.content.local_content_can_access_remote_urls   = True
c.content.local_storage                          = True
c.content.media_capture                          = 'ask' # true, false, ask
c.content.mouse_lock                             = 'ask' # true, false, ask
c.content.mute                                   = False
c.content.netrc_file                             = None
c.content.notifications                          = 'ask' # true, false, ask
c.content.pdfjs                                  = False
c.content.persistent_storage                     = 'ask' # true, false, ask
c.content.plugins                                = True
c.content.print_element_backgrounds              = True
c.content.private_browsing                       = False
c.content.proxy                                  = 'system' # system, none
c.content.proxy_dns_requests                     = True
c.content.register_protocol_handler              = 'ask' # true, false, ask
c.content.ssl_strict                             = 'ask' # true, false, ask
#c.content.user_stylesheets                       = []
c.content.webgl                                  = True
c.content.webrtc_ip_handling_policy              = 'all-interfaces'
	# all-interfaces, default-public-and-private-interfaces,
	# default-public-interface-only, disable-non-proxied-udp
c.content.windowed_fullscreen                    = True
c.content.xss_auditing                           = True

# ━━ downloads
c.downloads.location.directory  = '/home/gavarch/dwn'
c.downloads.location.prompt     = True
c.downloads.location.remember   = True
c.downloads.location.suggestion = 'path' # path, filename, both
c.downloads.open_dispatcher     = None # `{}` expanded to filename
c.downloads.position            = 'top'
c.downloads.remove_finished     = -1

# ━━ editor
c.editor.command  = ['gvim', '-f', '{file}', '-c', 'normal {line}G{column0}l']
c.editor.encoding = 'utf-8'

# ━━ hints
c.hints.auto_follow                = 'unique-match' # always, unique-match, full-match, never
c.hints.auto_follow_timeout        = 0
c.hints.border                     = '1px solid #edc074'
c.hints.chars                      = 'asdfghjkl'
#c.hints.dictionary                 = '/usr/share/dict/words'
c.hints.find_implementation        = 'python' # javascript, python
c.hints.hide_unmatched_rapid_hints = True
c.hints.min_chars                  = 1
c.hints.mode                       = 'letter' # number, letter, word
c.hints.next_regexes               = [
	'\\bnext\\b', '\\bmore\\b', '\\bnewer\\b',
	'\\b[>→≫]\\b', '\\b(>>|»)\\b', '\\bcontinue\\b'
	]
c.hints.prev_regexes               = [
	'\\bprev(ious)?\\b', '\\bback\\b', '\\bolder\\b',
	'\\b[<←≪]\\b', '\\b(<<|«)\\b'
	]
c.hints.scatter                    = True
#c.hints.selectors                  = {
#	'all': ['a', 'area', 'textarea', 'select', 'input:not([type="hidden"])',
#	'button', 'frame', 'iframe', 'img', 'link', 'summary', '[onclick]',
#	'[onmousedown]', '[role="link"]', '[role="option"]', '[role="button"]',
#	'[ng-click]', '[ngClick]', '[data-ng-click]', '[x-ng-click]', '[tabindex]'],
#	'links': ['a[href]', 'area[href]', 'link[href]', '[role="link"][href]'],
#	'images': ['img'], 'media': ['audio', 'img', 'video'], 'url': ['[src]',
#	'[href]'], 'inputs': ['input[type="text"]', 'input[type="date"]',
#	'input[type="datetime-local"]', 'input[type="email"]', 'input[type="month"]',
#	'input[type="number"]', 'input[type="password"]', 'input[type="search"]',
#	'input[type="tel"]', 'input[type="time"]', 'input[type="url"]',
#	'input[type="week"]', 'input:not([type])', 'textarea']
#	}
c.hints.uppercase                  = False
c.keyhint.blacklist                = []
c.keyhint.delay                    = 500
c.keyhint.radius                   = 6
c.history_gap_interval             = 30

# ━━ input
c.input.escape_quits_reporter         = True
c.input.forward_unbound_keys          = 'auto' # all, auto, none
c.input.insert_mode.auto_enter        = True
c.input.insert_mode.auto_leave        = True
c.input.insert_mode.auto_load         = True
c.input.insert_mode.leave_on_load     = True
c.input.insert_mode.plugins           = False
c.input.links_included_in_focus_chain = True
c.input.partial_timeout               = 5000
c.input.rocker_gestures               = False
c.input.spatial_navigation            = False

# ━━ prompt
c.prompt.filebrowser = True
c.prompt.radius      = 8

# ━━ qt
c.qt.args = []
c.qt.force_platform           = None
c.qt.force_software_rendering = 'chromium' # software-opengl, qt-quick, chromium, none
c.qt.highdpi                  = True
c.qt.low_end_device_mode      = 'auto' # always, auto, never
c.qt.process_model            = 'process-per-site-instance'
	# process-per-site-instance, process-per-site, single-process

# ━━ scrollbar
c.scrolling.bar    = 'when-searching' # always, never, when-searching
c.scrolling.smooth = True

# ━━ search
c.search.ignore_case = 'smart' # always, never, smart
c.search.incremental = True

# ━━ session
c.session.default_name = None
c.session.lazy_restore = True

# ━━ statusbar
c.statusbar.hide     = False
c.statusbar.padding  = {'top': 1, 'bottom': 1, 'left': 1, 'right': 1}
c.statusbar.position = 'bottom'
c.statusbar.widgets  = [ # url, scroll, scroll_raw, history, tabs, keypress, progress
	'keypress', 'url', 'scroll', 'history', 'tabs', 'progress'
	]

# ━━ url
c.url.auto_search             = 'naive' # naive, dns, never
c.url.default_page            = 'https://www.google.com/'
c.url.incdec_segments         = ['path', 'query'] # host, port, path, query, anchor
c.url.open_base_url           = True
c.url.searchengines           = {
	'DEFAULT': 'https://google.com/search?q={}',
	'ddg':     'https://duckduckgo.com/?q={}',
	'yt':      'https://youtube.com/search?q={}',
	'r':       'https://reddit.com/r/{}',
	'ws':      'http://watch-series.co/search.html?keyword={}'
	}
c.url.start_pages             = ['https://www.google.com']
c.url.yank_ignored_parameters = [
	'ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'
	]

# ━━ window
c.window.hide_decoration = False
c.window.title_format    = '{perc}{current_title}{title_sep}'

# ━━ zoom
c.zoom.default       = '100%'
c.zoom.levels        = [
	'25%', '33%', '50%', '67%', '75%', '90%', '100%', '110%',
	'125%', '150%', '175%', '200%', '250%', '300%', '400%', '500%'
	]
c.zoom.mouse_divider = 512
c.zoom.text_only     = False

# ━━ tabs
c.tabs.background                 = True
c.tabs.close_mouse_button         = 'middle'
c.tabs.close_mouse_button_on_bar  = 'new-tab' # new-tab, close-current, close-last, ignore
c.tabs.favicons.scale             = 1.0
c.tabs.favicons.show              = 'always' # always, never, pinned
c.tabs.indicator.padding          = {'top': 2, 'bottom': 2, 'left': 2, 'right': 2}
c.tabs.indicator.width            = 3
c.tabs.last_close                 = 'close' # ignore, blank, startpage, default-page, close
c.tabs.max_width                  = -1
c.tabs.min_width                  = -1
c.tabs.mode_on_change             = 'persist' # persist, restore, normal
c.tabs.mousewheel_switching       = True
c.tabs.new_position.related       = 'next' # prev, next, first, last
c.tabs.new_position.stacking      = True
c.tabs.new_position.unrelated     = 'last' # prev, next, first, last
c.tabs.padding                    = {'top': 2, 'bottom': 2, 'left': 2, 'right': 2}
c.tabs.pinned.frozen              = True
c.tabs.pinned.shrink              = True
c.tabs.position                   = 'bottom'
c.tabs.select_on_remove           = 'next' # prev, next, last-used
c.tabs.show                       = 'always' # always, never, multiple, switching
c.tabs.show_switching_delay       = 800
c.tabs.tabs_are_windows           = False
c.tabs.title.alignment            = 'left'
c.tabs.title.format               = '{audio}{index}: {current_title}'
c.tabs.title.format_pinned        = '{index}'
	# * `{perc}`: Percentage as a string like `[10%]`.
	# * `{perc_raw}`: Raw percentage, e.g. `10`.
	# * `{title}`: Title of the current web page.
	# * `{title_sep}`: The string ` - ` if a title is set, empty otherwise.
	# * `{index}`: Index of this tab.
	# * `{id}`: Internal tab ID of this tab.
	# * `{scroll_pos}`: Page scroll position.
	# * `{host}`: Host of the current web page.
	# * `{backend}`: Either ''webkit'' or ''webengine''
	# * `{private}`: Indicates when private mode is enabled.
	# * `{current_url}`: URL of the current web page.
	# * `{protocol}`: Protocol (http/https/...) of the current web page.
	# * `{audio}`: Indicator for audio/mute status.
c.tabs.width                      = '20%'
c.tabs.wrap                       = True
c.new_instance_open_target        = 'tab' # tab, tab-bg, tab-silent, tab-bg-silent, window
c.new_instance_open_target_window = 'last-focused' # first-opened, last-opened, last-focused, last-visible

# ━  FONTS
c.fonts.monospace                = 'Luxi Mono'
# , "xos4 Terminus", Terminus, Monospace, "DejaVu Sans Mono", Monaco, "Bitstream Vera Sans Mono", "Andale Mono", "Courier New", Courier, "Liberation Mono", monospace, Fixed, Consolas, Terminal'
c.fonts.completion.category      = 'bold 11pt monospace'
c.fonts.completion.entry         = '11pt monospace'
c.fonts.debug_console            = '11pt monospace'
c.fonts.downloads                = '11pt monospace'
c.fonts.hints                    = 'bold 11pt monospace'
c.fonts.keyhint                  = '11pt monospace'
c.fonts.messages.error           = 'italic 11pt monospace'
c.fonts.messages.info            = 'italic 11pt monospace'
c.fonts.messages.warning         = 'italic 11pt monospace'
c.fonts.prompts                  = '11pt sans-serif'
c.fonts.statusbar                = 'bold 11pt monospace'
c.fonts.tabs                     = 'bold 11pt monospace'
#c.fonts.web.family.cursive       = 'Arial'
#c.fonts.web.family.fantasy       = 'Arial'
#c.fonts.web.family.fixed         = 'Arial'
#c.fonts.web.family.sans_serif    = 'Arial'
#c.fonts.web.family.serif         = 'Garamond'
#c.fonts.web.family.standard      = 'Arial'
#c.fonts.web.size.default         = 16
#c.fonts.web.size.default_fixed   = 13
#c.fonts.web.size.minimum         = 0
#c.fonts.web.size.minimum_logical = 6

# ━  BINDINGS
# ━━ Normal
config.bind("'",              'enter-mode jump_mark')
config.bind('+',              'zoom-in')
config.bind('-',              'zoom-out')
config.bind('.',              'repeat-command')
config.bind('/',              'set-cmd-text /')
config.bind(':',              'set-cmd-text :')
config.bind(';I',             'hint images tab')
config.bind(';O',             'hint links fill :open -t -r {hint-url}')
config.bind(';R',             'hint --rapid links window')
config.bind(';Y',             'hint links yank-primary')
config.bind(';b',             'hint all tab-bg')
config.bind(';d',             'hint links download')
config.bind(';f',             'hint all tab-fg')
config.bind(';h',             'hint all hover')
config.bind(';i',             'hint images')
config.bind(';o',             'hint links fill :open {hint-url}')
config.bind(';r',             'hint --rapid links tab-bg')
config.bind(';t',             'hint inputs')
config.bind(';y',             'hint links yank')
config.bind('<Ctrl-1>',       'tab-focus 1')
config.bind('<Ctrl-2>',       'tab-focus 2')
config.bind('<Ctrl-3>',       'tab-focus 3')
config.bind('<Ctrl-4>',       'tab-focus 4')
config.bind('<Ctrl-5>',       'tab-focus 5')
config.bind('<Ctrl-6>',       'tab-focus 6')
config.bind('<Ctrl-7>',       'tab-focus 7')
config.bind('<Ctrl-8>',       'tab-focus 8')
config.bind('<Ctrl-9>',       'tab-focus -1')
config.bind('<Ctrl-A>',       'navigate increment')
config.bind('<Ctrl-Alt-p>',   'print')
config.bind('<Ctrl-B>',       'scroll-page 0 -1')
config.bind('<Ctrl-D>',       'scroll-page 0 0.5')
config.bind('<Ctrl-F5>',      'reload -f')
config.bind('<Ctrl-F>',       'scroll-page 0 1')
config.bind('<Ctrl-N>',       'open -w')
config.bind('<Ctrl-PgDown>',  'tab-next')
config.bind('<Ctrl-PgUp>',    'tab-prev')
config.bind('<Ctrl-Q>',       'quit')
config.bind('<Ctrl-Return>',  'follow-selected -t')
config.bind('<Ctrl-Shift-N>', 'open -p')
config.bind('<Ctrl-Shift-T>', 'undo')
config.bind('<Ctrl-Shift-W>', 'close')
config.bind('<Ctrl-T>',       'open -t')
config.bind('<Ctrl-Tab>',     'tab-focus last')
config.bind('<Ctrl-U>',       'scroll-page 0 -0.5')
config.bind('<Ctrl-V>',       'enter-mode passthrough')
config.bind('<Ctrl-W>',       'tab-close')
config.bind('<Ctrl-X>',       'navigate decrement')
config.bind('<Ctrl-^>',       'tab-focus last')
config.bind('<Ctrl-h>',       'home')
config.bind('<Ctrl-p>',       'tab-pin')
config.bind('<Ctrl-s>',       'stop')
config.bind('<Escape>',       'clear-keychain ;; search ;; fullscreen --leave')
config.bind('<F11>',          'fullscreen')
config.bind('<F5>',           'reload')
config.bind('<Return>',       'follow-selected')
config.bind('<back>',         'back')
config.bind('<forward>',      'forward')
config.bind('=',              'zoom')
config.bind('?',              'set-cmd-text ?')
config.bind('@',              'run-macro')
config.bind('B',              'set-cmd-text -s :quickmark-load -t')
config.bind('D',              'tab-close -o')
config.bind('F',              'hint all tab')
config.bind('G',              'scroll-to-perc')
config.bind('H',              'back')
config.bind('J',              'tab-next')
config.bind('K',              'tab-prev')
config.bind('L',              'forward')
config.bind('M',              'bookmark-add')
config.bind('N',              'search-prev')
config.bind('O',              'set-cmd-text -s :open -t')
config.bind('PP',             'open -t -- {primary}')
config.bind('Pp',             'open -t -- {clipboard}')
config.bind('R',              'reload -f')
config.bind('Sb',             'open qute://bookmarks#bookmarks')
config.bind('Sh',             'open qute://history')
config.bind('Sq',             'open qute://bookmarks')
config.bind('Ss',             'open qute://settings')
config.bind('T',              'tab-focus')
config.bind('ZQ',             'quit')
config.bind('ZZ',             'quit --save')
config.bind('[[',             'navigate prev')
config.bind(']]',             'navigate next')
config.bind('`',              'enter-mode set_mark')
config.bind('ad',             'download-cancel')
config.bind('b',              'set-cmd-text -s :quickmark-load')
config.bind('cd',             'download-clear')
config.bind('co',             'tab-only')
config.bind('d',              'tab-close')
config.bind('f',              'hint')
config.bind('g$',             'tab-focus -1')
config.bind('g0',             'tab-focus 1')
config.bind('gB',             'set-cmd-text -s :bookmark-load -t')
config.bind('gC',             'tab-clone')
config.bind('gO',             'set-cmd-text :open -t -r {url:pretty}')
config.bind('gU',             'navigate up -t')
config.bind('g^',             'tab-focus 1')
config.bind('ga',             'set-cmd-text :open -t')
config.bind('gb',             'set-cmd-text -s :bookmark-load')
config.bind('gd',             'download')
config.bind('gf',             'view-source')
config.bind('gg',             'scroll-to-perc 0')
config.bind('gl',             'tab-move -')
config.bind('gm',             'tab-move')
config.bind('go',             'set-cmd-text :open {url:pretty}')
config.bind('gr',             'tab-move +')
config.bind('gt',             'set-cmd-text -s :buffer')
config.bind('gu',             'navigate up')
config.bind('h',              'scroll left')
config.bind('i',              'enter-mode insert')
config.bind('j',              'scroll down')
config.bind('k',              'scroll up')
config.bind('l',              'scroll right')
config.bind('m',              'quickmark-save')
config.bind('n',              'search-next')
config.bind('o',              'set-cmd-text -s :open')
config.bind('pP',             'open -- {primary}')
config.bind('pp',             'open -- {clipboard}')
config.bind('q',              'record-macro')
config.bind('r',              'reload')
config.bind('sf',             'save')
config.bind('sk',             'set-cmd-text -s :bind')
config.bind('sl',             'set-cmd-text -s :set -t')
config.bind('ss',             'set-cmd-text -s :set')
config.bind('tPH',            'config-cycle -p -u *://*.{url:host}/* content.plugins ;; reload')
config.bind('tPh',            'config-cycle -p -u *://{url:host}/* content.plugins ;; reload')
config.bind('tPu',            'config-cycle -p -u {url} content.plugins ;; reload')
config.bind('tSH',            'config-cycle -p -u *://*.{url:host}/* content.javascript.enabled ;; reload')
config.bind('tSh',            'config-cycle -p -u *://{url:host}/* content.javascript.enabled ;; reload')
config.bind('tSu',            'config-cycle -p -u {url} content.javascript.enabled ;; reload')
config.bind('th',             'back -t')
config.bind('tl',             'forward -t')
config.bind('tpH',            'config-cycle -p -t -u *://*.{url:host}/* content.plugins ;; reload')
config.bind('tph',            'config-cycle -p -t -u *://{url:host}/* content.plugins ;; reload')
config.bind('tpu',            'config-cycle -p -t -u {url} content.plugins ;; reload')
config.bind('tsH',            'config-cycle -p -t -u *://*.{url:host}/* content.javascript.enabled ;; reload')
config.bind('tsh',            'config-cycle -p -t -u *://{url:host}/* content.javascript.enabled ;; reload')
config.bind('tsu',            'config-cycle -p -t -u {url} content.javascript.enabled ;; reload')
config.bind('u',              'undo')
config.bind('v',              'enter-mode caret')
config.bind('wB',             'set-cmd-text -s :bookmark-load -w')
config.bind('wO',             'set-cmd-text :open -w {url:pretty}')
config.bind('wP',             'open -w -- {primary}')
config.bind('wb',             'set-cmd-text -s :quickmark-load -w')
config.bind('wf',             'hint all window')
config.bind('wh',             'back -w')
config.bind('wi',             'inspector')
config.bind('wl',             'forward -w')
config.bind('wo',             'set-cmd-text -s :open -w')
config.bind('wp',             'open -w -- {clipboard}')
config.bind('xO',             'set-cmd-text :open -b -r {url:pretty}')
config.bind('xo',             'set-cmd-text -s :open -b')
config.bind('yD',             'yank domain -s')
config.bind('yP',             'yank pretty-url -s')
config.bind('yT',             'yank title -s')
config.bind('yY',             'yank -s')
config.bind('yd',             'yank domain')
config.bind('yp',             'yank pretty-url')
config.bind('yt',             'yank title')
config.bind('yy',             'yank')
config.bind('{{',             'navigate prev -t')
config.bind('}}',             'navigate next -t')

# ━━ Caret
config.bind('$',            'move-to-end-of-line', mode='caret')
config.bind('0',            'move-to-start-of-line', mode='caret')
config.bind('<Ctrl-Space>', 'drop-selection', mode='caret')
config.bind('<Escape>',     'leave-mode', mode='caret')
config.bind('<Return>',     'yank selection', mode='caret')
config.bind('<Space>',      'toggle-selection', mode='caret')
config.bind('G',            'move-to-end-of-document', mode='caret')
config.bind('H',            'scroll left', mode='caret')
config.bind('J',            'scroll down', mode='caret')
config.bind('K',            'scroll up', mode='caret')
config.bind('L',            'scroll right', mode='caret')
config.bind('Y',            'yank selection -s', mode='caret')
config.bind('[',            'move-to-start-of-prev-block', mode='caret')
config.bind(']',            'move-to-start-of-next-block', mode='caret')
config.bind('b',            'move-to-prev-word', mode='caret')
config.bind('c',            'enter-mode normal', mode='caret')
config.bind('e',            'move-to-end-of-word', mode='caret')
config.bind('gg',           'move-to-start-of-document', mode='caret')
config.bind('h',            'move-to-prev-char', mode='caret')
config.bind('j',            'move-to-next-line', mode='caret')
config.bind('k',            'move-to-prev-line', mode='caret')
config.bind('l',            'move-to-next-char', mode='caret')
config.bind('v',            'toggle-selection', mode='caret')
config.bind('w',            'move-to-next-word', mode='caret')
config.bind('y',            'yank selection', mode='caret')
config.bind('{',            'move-to-end-of-prev-block', mode='caret')
config.bind('}',            'move-to-end-of-next-block', mode='caret')

# ━━ Command
config.bind('<Alt-B>',          'rl-backward-word', mode='command')
config.bind('<Alt-D>',          'rl-kill-word', mode='command')
config.bind('<Alt-F>',          'rl-forward-word', mode='command')
config.bind('<Ctrl-Backspace>', 'rl-backward-kill-word', mode='command')
config.bind('<Ctrl-?>',         'rl-delete-char', mode='command')
config.bind('<Ctrl-A>',         'rl-beginning-of-line', mode='command')
config.bind('<Ctrl-B>',         'rl-backward-char', mode='command')
config.bind('<Ctrl-C>',         'completion-item-yank', mode='command')
config.bind('<Ctrl-D>',         'completion-item-del', mode='command')
config.bind('<Ctrl-E>',         'rl-end-of-line', mode='command')
config.bind('<Ctrl-F>',         'rl-forward-char', mode='command')
config.bind('<Ctrl-H>',         'rl-backward-delete-char', mode='command')
config.bind('<Ctrl-K>',         'rl-kill-line', mode='command')
config.bind('<Ctrl-N>',         'command-history-next', mode='command')
config.bind('<Ctrl-P>',         'command-history-prev', mode='command')
config.bind('<Ctrl-Return>',    'command-accept --rapid', mode='command')
config.bind('<Ctrl-Shift-C>',   'completion-item-yank --sel', mode='command')
config.bind('<Ctrl-Shift-Tab>', 'completion-item-focus prev-category', mode='command')
config.bind('<Ctrl-Tab>',       'completion-item-focus next-category', mode='command')
config.bind('<Ctrl-U>',         'rl-unix-line-discard', mode='command')
config.bind('<Ctrl-W>',         'rl-unix-word-rubout', mode='command')
config.bind('<Ctrl-Y>',         'rl-yank', mode='command')
config.bind('<Down>',           'completion-item-focus --history next', mode='command')
config.bind('<Escape>',         'leave-mode', mode='command')
config.bind('<Return>',         'command-accept', mode='command')
config.bind('<Shift-Delete>',   'completion-item-del', mode='command')
config.bind('<Shift-Tab>',      'completion-item-focus prev', mode='command')
config.bind('<Tab>',            'completion-item-focus next', mode='command')
config.bind('<Up>',             'completion-item-focus --history prev', mode='command')
config.bind('gy',               'open -t youtube.com', mode='command')
config.bind('gss',              'open -t https://sussed.soton.ac.uk/cp/home/displaylogin', mode='command')
config.bind('gbb',              'open -t https://blackboard.soton.ac.uk/webapps/login/', mode='command')
config.bind('gtt',              'open -t https://timetable.soton.ac.uk/', mode='command')
config.bind('gsp',              'open -t https://sotonac-my.sharepoint.com/personal/gllv1g15_soton_ac_uk/_layouts/15/onedrive.aspx', mode='command')
config.bind('gm',               'open -t https://outlook.office.com/owa/?realm=soton.ac.uk', mode='command')
config.bind('god',              'open -t https://onedrive.live.com/?id=FA5C121A2376FB2D%211566&cid=FA5C121A2376FB2D', mode='command')

# ━━ Hint
config.bind('<Ctrl-B>', 'hint all tab-bg', mode='hint')
config.bind('<Ctrl-F>', 'hint links', mode='hint')
config.bind('<Ctrl-R>', 'hint --rapid links tab-bg', mode='hint')
config.bind('<Escape>', 'leave-mode', mode='hint')
config.bind('<Return>', 'follow-hint', mode='hint')

# ━━ Insert
config.bind('<Ctrl-E>',    'open-editor', mode='insert')
config.bind('<Escape>',    'leave-mode', mode='insert')
config.bind('<Shift-Ins>', 'insert-text {primary}', mode='insert')

# ━━ Passthrough
config.bind('<Ctrl-V>', 'leave-mode', mode='passthrough')

# ━━ Prompt
config.bind('<Alt-B>',         'rl-backward-word', mode='prompt')
config.bind('<Alt-Backspace>', 'rl-backward-kill-word', mode='prompt')
config.bind('<Alt-D>',         'rl-kill-word', mode='prompt')
config.bind('<Alt-F>',         'rl-forward-word', mode='prompt')
config.bind('<Alt-Shift-Y>',   'prompt-yank --sel', mode='prompt')
config.bind('<Alt-Y>',         'prompt-yank', mode='prompt')
config.bind('<Ctrl-?>',        'rl-delete-char', mode='prompt')
config.bind('<Ctrl-A>',        'rl-beginning-of-line', mode='prompt')
config.bind('<Ctrl-B>',        'rl-backward-char', mode='prompt')
config.bind('<Ctrl-E>',        'rl-end-of-line', mode='prompt')
config.bind('<Ctrl-F>',        'rl-forward-char', mode='prompt')
config.bind('<Ctrl-H>',        'rl-backward-delete-char', mode='prompt')
config.bind('<Ctrl-K>',        'rl-kill-line', mode='prompt')
config.bind('<Ctrl-U>',        'rl-unix-line-discard', mode='prompt')
config.bind('<Ctrl-W>',        'rl-unix-word-rubout', mode='prompt')
config.bind('<Ctrl-X>',        'prompt-open-download', mode='prompt')
config.bind('<Ctrl-Y>',        'rl-yank', mode='prompt')
config.bind('<Down>',          'prompt-item-focus next', mode='prompt')
config.bind('<Escape>',        'leave-mode', mode='prompt')
config.bind('<Return>',        'prompt-accept', mode='prompt')
config.bind('<Shift-Tab>',     'prompt-item-focus prev', mode='prompt')
config.bind('<Tab>',           'prompt-item-focus next', mode='prompt')
config.bind('<Up>',            'prompt-item-focus prev', mode='prompt')

# ━━ Register
config.bind('<Escape>', 'leave-mode', mode='register')

# ━━ Yesno
config.bind('<Alt-Shift-Y>', 'prompt-yank --sel', mode='yesno')
config.bind('<Alt-Y>',       'prompt-yank', mode='yesno')
config.bind('<Escape>',      'leave-mode', mode='yesno')
config.bind('<Return>',      'prompt-accept', mode='yesno')
config.bind('n',             'prompt-accept no', mode='yesno')
config.bind('y',             'prompt-accept yes', mode='yesno')
