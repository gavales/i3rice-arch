#                     ██
#    ████            ▒██
#   ██▒▒██  ██   ██ ██████  █████
#  ▒██ ▒██ ▒██  ▒██▒▒▒██▒  ██▒▒▒██
#  ▒▒█████ ▒██  ▒██  ▒██  ▒███████
#   ▒▒▒▒██ ▒██  ▒██  ▒██  ▒██▒▒▒▒
#      ▒███▒▒██████  ▒▒██ ▒▒██████
#      ▒▒▒  ▒▒▒▒▒▒    ▒▒   ▒▒▒▒▒▒
# vim:ft=python

# ━  SETTINGS
# config.load_autoconfig()

c.aliases = {
	'w':  'session-save',
	'q':  'close',         'qa':  'quit',
	'wq': 'quit --save',   'wqa': 'quit --save'
}

c.auto_save.interval = 15000
c.auto_save.session = True

c.backend = 'webengine'

c.bindings.key_mappings = {
	'<Ctrl-[>': '<Escape>',
	'<Ctrl-6>': '<Ctrl-^>',
	'<Ctrl-M>': '<Return>',
	'<Ctrl-J>': '<Return>',
	'<Ctrl-I>': '<Tab>',
	'<Shift-Return>': '<Return>',
	'<Enter>': '<Return>',
	'<Shift-Enter>': '<Return>',
	'<Ctrl-Enter>': '<Ctrl-Return>'
}

c.content.fullscreen.window = True

# List of URLs of lists which contain hosts to block.  The file can be
# in one of the following formats:
#   - An `/etc/hosts`-like file
#   - One host per line
#   - A zip-file of any of the above, with either only one
#   file, or a file named `hosts` (with any extension).
# It's also possible to add a local file or directory
# via a `file://` URL. In case of a directory, all files
# in the directory are read as adblock lists.  The file
# `~/.config/qutebrowser/blocked-hosts` is always read
# if it exists.
c.content.host_blocking.lists = ['https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts']

## A list of patterns that should always be loaded, despite being ad-
## blocked. Note this whitelists blocked hosts, not first-party URLs. As
## an example, if `example.org` loads an ad from `ads.example.org`, the
## whitelisted host should be `ads.example.org`. If you want to disable
## the adblocker on a given page, use the `content.host_blocking.enabled`
## setting with a URL pattern instead. Local domains are always exempt
## from hostblocking.
## Type: List of UrlPattern
# c.content.host_blocking.whitelist = []

c.content.media_capture = 'ask'                             # true false ask
c.content.mouse_lock = 'ask'                                # true false ask
c.content.notifications = 'ask'                             # true false ask
c.content.pdfjs = False
c.content.plugins = False                                   # Enable plugins in Web pages.
c.content.xss_auditing = True

# c.downloads.location.directory = None
c.downloads.location.prompt = True
c.downloads.location.remember = True
c.downloads.location.suggestion = 'both'                    # path filename both
# c.downloads.open_dispatcher = None
##   Any `{}` in the string will be expanded to the filename,
##   else the filename will be appended.
c.downloads.position = 'top'
c.downloads.remove_finished = 20000                         # -1: downloads are never removed.

# Editor (and arguments) to use for the `open-editor` command.
# The following placeholders are defined:
#   * `{file}`: Filename of the file to be edited.
#   * `{line}`: Line in which the caret is found in the text.
#   * `{column}`: Column in which the caret is found in the text.
#   * `{line0}`: Same as `{line}`, but starting from index 0.
#   * `{column0}`: Same as `{column}`, but starting from index 0.
c.editor.command = ['edtr', '{file}']
# c.editor.encoding = 'utf-8'

## Maximum time (in minutes) between two history items for them to be
## considered being from the same browsing session. Items with less time
## between them are grouped when being displayed in `:history`. Use -1 to
## disable separation.
## Type: Int
# c.history_gap_interval = 30

## Allow Escape to quit the crash reporter.
## Type: Bool
# c.input.escape_quits_reporter = True

## Which unbound keys to forward to the webview in normal mode.
## Type: String
## Valid values:
##   - all: Forward all unbound keys.
##   - auto: Forward unbound non-alphanumeric keys.
##   - none: Don't forward any keys.
# c.input.forward_unbound_keys = 'auto'

c.input.insert_mode.auto_enter = True
c.input.insert_mode.auto_leave = True
c.input.insert_mode.auto_load = False
c.input.insert_mode.leave_on_load = True
c.input.insert_mode.plugins = False

c.input.links_included_in_focus_chain = True

c.input.mouse.back_forward_buttons = True

c.input.mouse.rocker_gestures = False

c.input.partial_timeout = 1000

c.input.spatial_navigation = False

## Keychains that shouldn't be shown in the keyhint dialog. Globs are
## supported, so `;*` will blacklist all keychains starting with `;`. Use
## `*` to disable keyhints.
## Type: List of String
# c.keyhint.blacklist = []

# Time (in milliseconds) from pressing a key to seeing the keyhint
# dialog.
# Type: Int
c.keyhint.delay = 500

c.keyhint.radius = 6

c.messages.timeout = 5000

c.new_instance_open_target = 'tab'
#  - tab: Open a new tab in the existing window and activate the window.
#  - tab-bg: Open a new background tab in the existing window and activate the window.
#  - tab-silent: Open a new tab in the existing window without activating the window.
#  - tab-bg-silent: Open a new background tab in the existing window without activating the window.
#  - window: Open in a new window.

c.new_instance_open_target_window = 'last-focused'
#  - first-opened: Open new tabs in the first (oldest) opened window.
#  - last-opened: Open new tabs in the last (newest) opened window.
#  - last-focused: Open new tabs in the most recently focused window.
#  - last-visible: Open new tabs in the most recently visible window.

c.prompt.filebrowser = True
c.prompt.radius = 8

## Additional arguments to pass to Qt, without leading `--`. With
## QtWebEngine, some Chromium arguments (see
## https://peter.sh/experiments/chromium-command-line-switches/ for a
## list) will work.
## Type: List of String
#c.qt.args = []

## Force a Qt platform to use. This sets the `QT_QPA_PLATFORM`
## environment variable and is useful to force using the XCB plugin when
## running QtWebEngine on Wayland.
## Type: String
#c.qt.force_platform = None

## Force a Qt platformtheme to use. This sets the `QT_QPA_PLATFORMTHEME`
## environment variable which controls dialogs like the filepicker. By
## default, Qt determines the platform theme based on the desktop
## environment.
## Type: String
#c.qt.force_platformtheme = None

# Force software rendering for QtWebEngine. This is needed for
# QtWebEngine to work with Nouveau drivers and can be useful in other
# scenarios related to graphic issues.
# Type: String
# Valid values:
#   - software-opengl: Tell LibGL to use a software implementation of GL (`LIBGL_ALWAYS_SOFTWARE` / `QT_XCB_FORCE_SOFTWARE_OPENGL`)
#   - qt-quick: Tell Qt Quick to use a software renderer instead of OpenGL. (`QT_QUICK_BACKEND=software`)
#   - chromium: Tell Chromium to disable GPU support and use Skia software rendering instead. (`--disable-gpu`)
#   - none: Don't force software rendering.
c.qt.force_software_rendering = 'none'

# Turn on Qt HighDPI scaling. This is equivalent to setting
# QT_AUTO_SCREEN_SCALE_FACTOR=1 or QT_ENABLE_HIGHDPI_SCALING=1 (Qt >=
# 5.14) in the environment. It's off by default as it can cause issues
# with some bitmap fonts. As an alternative to this, it's possible to
# set font sizes and the `zoom.default` setting.
# Type: Bool
c.qt.highdpi = False

# When to use Chromium's low-end device mode. This improves the RAM
# usage of renderer processes, at the expense of performance.
# Type: String
# Valid values:
#   - always: Always use low-end device mode.
#   - auto: Decide automatically (uses low-end mode with < 1 GB available RAM).
#   - never: Never use low-end device mode.
c.qt.low_end_device_mode = 'auto'

# Which Chromium process model to use. Alternative process models use
# less resources, but decrease security and robustness. See the
# following pages for more details:    -
# https://www.chromium.org/developers/design-documents/process-models
# - https://doc.qt.io/qt-5/qtwebengine-features.html#process-models
# Type: String
# Valid values:
#   - process-per-site-instance: Pages from separate sites are put into separate processes and separate visits to the same site are also isolated.
#   - process-per-site: Pages from separate sites are put into separate processes. Unlike Process per Site Instance, all visits to the same site will share an OS process. The benefit of this model is reduced memory consumption, because more web pages will share processes. The drawbacks include reduced security, robustness, and responsiveness.
#   - single-process: Run all tabs in a single process. This should be used for debugging purposes only, and it disables `:open --private`.
c.qt.process_model = 'process-per-site-instance'
c.scrolling.bar = 'overlay'                                 # always never when-searching overlay
c.scrolling.smooth = False

c.search.ignore_case = 'smart'                              # always never smart
c.search.incremental = True
c.search.wrap = True

c.session.default_name = None

c.session.lazy_restore = True

c.spellcheck.languages = ['en-GB']

c.url.auto_search = 'naive'
#   - naive: Use simple/naive check.
#   - dns: Use DNS requests (might be slow!).
#   - never: Never search automatically.
#   - schemeless: Always search automatically unless URL explicitly contains a scheme.

c.url.default_page = 'https://start.duckduckgo.com/'

# Open base URL of the searchengine if a searchengine shortcut is
# invoked without parameters.
# Type: Bool
c.url.open_base_url = True

# The placeholder will be replaced by the search term, use
# `{{` and `}}` for literal `{`/`}` braces.  The following further
# placeholds are defined to configure how special characters in the
# search terms are replaced by safe characters (called 'quoting'):
#   * `{}` and `{semiquoted}` quote everything except slashes; this is the
#     most sensible choice for almost all search engines (for the search
#     term `slash/and&amp` this placeholder expands to `slash/and%26amp`).
#   * `{quoted}` quotes all characters (for `slash/and&amp` this
#     placeholder   expands to `slash%2Fand%26amp`).
#   * `{unquoted}` quotes nothing (for `slash/and&amp` this
#     placeholder expands to `slash/and&amp`).
# The search engine named `DEFAULT` is used when `url.auto_search`
#   is turned on and something else than a URL was entered to
#   be opened. Other search engines can be used by prepending
#   the search engine name to the search term,
#   e.g. `:open google ## qutebrowser`.
c.url.searchengines = {
	'DEFAULT': 'https://google.com/search?q={}',
	'y': 'https://youtube.com/search?q={}',
	'd': 'https://duckduckgo.com/?q={}',
	'r': 'https://reddit.com/r/{}/new'
	}
#	'y':     'https://youtube.com/search?q={}',
#	'w':     'https://www3.watchserieshd.tv/search.html?keyword={}'

# Page(s) to open at the start.
# Type: List of FuzzyUrl, or FuzzyUrl
c.url.start_pages = ['https://google.com']

# URL parameters to strip with `:yank url`.
# Type: List of String
c.url.yank_ignored_parameters = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

c.window.hide_decoration = False

c.window.title_format = '{current_title}{title_sep}qutebrowser'

c.zoom.default = '100%'
c.zoom.levels = ['25%', '33%', '50%', '67%', '75%', '90%', '100%', '110%', '125%', '150%', '175%', '200%', '250%', '300%', '400%', '500%']
c.zoom.mouse_divider = 512
#c.zoom.text_only = False

# ━  COLORS

config.set("colors.webpage.darkmode.enabled", True)

c.hints.border = '1px solid #a87f64'

c.colors.completion.category.bg = 'qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 #96778A, stop:1 #96778A)'
c.colors.completion.category.border.bottom      = '#96778A'
c.colors.completion.category.border.top         = '#96778A'
c.colors.completion.category.fg                 = '#201E21'
c.colors.completion.even.bg                     = '#e9e7e3'
c.colors.completion.odd.bg                      = '#e9e7e3'
c.colors.completion.fg                          = ['#96778A', '#201E21', '#c1bfbb']
c.colors.completion.item.selected.bg            = '#96778A'
c.colors.completion.item.selected.fg            = '#201E21'
c.colors.completion.item.selected.border.bottom = '#B98C68'
c.colors.completion.item.selected.border.top    = '#B98C68'
c.colors.completion.match.fg                    = '#96778A'
c.colors.completion.item.selected.match.fg      = '#96778A'
c.colors.completion.scrollbar.bg                = '#e9e7e3'
c.colors.completion.scrollbar.fg                = '#201E21'

c.colors.contextmenu.disabled.bg = None
c.colors.contextmenu.disabled.fg = None
c.colors.contextmenu.menu.bg = None
c.colors.contextmenu.menu.fg = None
c.colors.contextmenu.selected.bg = None
c.colors.contextmenu.selected.fg = None

c.colors.downloads.bar.bg    = '#e9e7e3'
c.colors.downloads.error.bg  = '#A36043'
c.colors.downloads.error.fg  = '#201E21'
c.colors.downloads.start.bg  = '#96778A'
c.colors.downloads.start.fg  = '#201E21'
c.colors.downloads.stop.bg   = '#B98C68'
c.colors.downloads.stop.fg   = '#201E21'
c.colors.downloads.system.bg = 'rgb' # rgb, hsv, hsl, none
c.colors.downloads.system.fg = 'rgb' # rgb, hsv, hsl, none

c.colors.hints.bg = 'qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 rgba(208, 155, 109, 0.8), stop:1 rgba(208, 155, 109, 0.8))'
c.colors.hints.fg          = '#201E21'
c.colors.hints.match.fg    = '#B98C68'
c.colors.keyhint.bg        = 'rgba(208, 155, 109, 80%)'
c.colors.keyhint.fg        = '#201E21'
c.colors.keyhint.suffix.fg = '#e9e7e3'

c.colors.messages.error.bg     = '#8a5849'
c.colors.messages.error.border = '#8a5849'
c.colors.messages.error.fg     = '#fdfbf7'
c.colors.messages.info.bg     = '#e9e7e3'
c.colors.messages.info.border = '#e9e7e3'
c.colors.messages.info.fg     = '#201E21'
c.colors.messages.warning.bg     = '#a87f64'
c.colors.messages.warning.border = '#a87f64'
c.colors.messages.warning.fg     = '#201E21'

c.colors.prompts.bg          = '#fdfbf7'
c.colors.prompts.border      = '1px solid #e9e7e3'
c.colors.prompts.fg          = '#201E21'
c.colors.prompts.selected.bg = '#c9b9c0'

c.colors.statusbar.caret.fg             = '#D5AE91'
c.colors.statusbar.caret.bg             = '#f0ebe9'
c.colors.statusbar.caret.selection.fg   = '#fdfbf7'
c.colors.statusbar.caret.selection.bg   = '#ab8c7c'
c.colors.statusbar.command.fg           = '#201E21'
c.colors.statusbar.command.bg           = '#f0ebe9'
c.colors.statusbar.command.private.bg   = '#484649'
c.colors.statusbar.command.private.fg   = '#fdfbf7'
c.colors.statusbar.insert.fg            = '#997561'
c.colors.statusbar.insert.bg            = '#f0ebe9'
c.colors.statusbar.normal.fg            = '#201E21'
c.colors.statusbar.normal.bg            = '#f0ebe9'
c.colors.statusbar.passthrough.bg       = '#c9b9c0'
c.colors.statusbar.passthrough.fg       = '#201E21'
c.colors.statusbar.private.bg           = '#a08798'
c.colors.statusbar.private.fg           = '#201E21'
c.colors.statusbar.progress.bg          = '#201E21'
c.colors.statusbar.url.error.fg         = '#8a5849'
c.colors.statusbar.url.fg               = '#343235'
c.colors.statusbar.url.hover.fg         = '#201E21'
c.colors.statusbar.url.success.http.fg  = '#997561'
c.colors.statusbar.url.success.https.fg = '#997561'
c.colors.statusbar.url.warn.fg          = '#a87f64'

c.colors.tabs.bar.bg           = '#c9b9c0'
c.colors.tabs.even.bg          = '#c9b9c0'
c.colors.tabs.even.fg          = '#96778A'
c.colors.tabs.odd.bg           = '#d6cace'
c.colors.tabs.odd.fg           = '#96778A'
c.colors.tabs.indicator.error  = '#8a5849'
c.colors.tabs.indicator.start  = '#997561'
c.colors.tabs.indicator.stop   = '#96778A'
c.colors.tabs.indicator.system = 'rgb'                      # rgb, hsv, hsl, none
c.colors.tabs.selected.even.bg = '#f0ebe9'
c.colors.tabs.selected.even.fg = '#201E21'
c.colors.tabs.selected.odd.bg  = '#f0ebe9'
c.colors.tabs.selected.odd.fg  = '#201E21'
c.colors.tabs.pinned.even.bg          = '#386c96'
c.colors.tabs.pinned.even.fg          = '#201E21'
c.colors.tabs.pinned.odd.bg           = '#386c96'
c.colors.tabs.pinned.odd.fg           = '#201E21'
c.colors.tabs.pinned.selected.even.bg = '#f0ebe9'
c.colors.tabs.pinned.selected.even.fg = '#5b4a55'
c.colors.tabs.pinned.selected.odd.bg  = '#f0ebe9'
c.colors.tabs.pinned.selected.odd.fg  = '#5b4a55'

c.colors.webpage.bg = '#f0ebe9'

c.colors.webpage.prefers_color_scheme_dark = True

# ━  JAVA
c.content.images = True
#c.content.javascript.alert = True
c.content.javascript.can_access_clipboard = True
#c.content.javascript.can_close_tabs = False
c.content.javascript.can_open_tabs_automatically = False
c.content.javascript.enabled = True

# c.content.javascript.log = {'unknown': 'debug', 'info': 'debug', 'warning': 'debug', 'error': 'debug'}
# c.content.javascript.modal_dialog = False
# c.content.javascript.prompt = True
# c.content.local_content_can_access_file_urls = True
# c.content.local_content_can_access_remote_urls = False
# c.content.local_storage = True

# ━  FONTS
c.fonts.completion.category = 'bold default_size default_family'
c.fonts.completion.entry = 'default_size default_family'
c.fonts.contextmenu = None
c.fonts.debug_console = 'default_size default_family'
c.fonts.default_family = ['Century Schoolbook Monospace']
c.fonts.default_size = '14pt'
c.fonts.downloads = 'default_size default_family'
c.fonts.hints = 'bold default_size default_family'
c.fonts.keyhint = 'default_size default_family'
c.fonts.messages.error = 'default_size default_family'
c.fonts.messages.info = 'default_size default_family'
c.fonts.messages.warning = 'default_size default_family'
c.fonts.prompts = 'default_size sans-serif'
c.fonts.statusbar = 'default_size default_family'
c.fonts.tabs.selected = 'default_size default_family'
c.fonts.tabs.unselected = 'default_size default_family'
c.fonts.web.family.cursive = ''
c.fonts.web.family.fantasy = ''
c.fonts.web.family.fixed = ''
c.fonts.web.family.sans_serif = ''
c.fonts.web.family.serif = ''
c.fonts.web.family.standard = ''
c.fonts.web.size.default = 16
c.fonts.web.size.default_fixed = 13
c.fonts.web.size.minimum = 0
c.fonts.web.size.minimum_logical = 6

# ━  HINTS
c.hints.auto_follow = 'unique-match'
#   - always: Auto-follow whenever there is only a single hint on a page.
#   - unique-match: Auto-follow whenever there is a unique non-empty match in either the hint string (word mode) or filter (number mode).
#   - full-match: Follow the hint when the user typed the whole hint (letter, word or number mode) or the element's text (only in number mode).
#   - never: The user will always need to press Enter to follow a hint.

c.hints.auto_follow_timeout = 0

c.hints.chars = 'asdfghjkl'
#c.hints.find_implementation = 'python' # javascript python
#c.hints.hide_unmatched_rapid_hints = True
#c.hints.leave_on_load = True
c.hints.min_chars = 1
c.hints.mode = 'letter'                                     # number letter word
#c.hints.next_regexes = ['\\bnext\\b', '\\bmore\\b', '\\bnewer\\b', '\\b[>→≫]\\b', '\\b(>>|»)\\b', '\\bcontinue\\b']
c.hints.padding = {'top': 0, 'bottom': 0, 'left': 3, 'right': 3}
#c.hints.prev_regexes = ['\\bprev(ious)?\\b', '\\bback\\b', '\\bolder\\b', '\\b[<←≪]\\b', '\\b(<<|«)\\b']
c.hints.radius = 3
#c.hints.scatter = True
#c.hints.selectors = {'all': ['a', 'area', 'textarea', 'select', 'input:not([type="hidden"])', 'button', 'frame', 'iframe', 'img', 'link', 'summary', '[onclick]', '[onmousedown]', '[role="link"]', '[role="option"]', '[role="button"]', '[ng-click]', '[ngClick]', '[data-ng-click]', '[x-ng-click]', '[tabindex]'], 'links': ['a[href]', 'area[href]', 'link[href]', '[role="link"][href]'], 'images': ['img'], 'media': ['audio', 'img', 'video'], 'url': ['[src]', '[href]'], 'inputs': ['input[type="text"]', 'input[type="date"]', 'input[type="datetime-local"]', 'input[type="email"]', 'input[type="month"]', 'input[type="number"]', 'input[type="password"]', 'input[type="search"]', 'input[type="tel"]', 'input[type="time"]', 'input[type="url"]', 'input[type="week"]', 'input:not([type])', 'textarea']}
#c.hints.uppercase = False

# ━  STATUSBAR
c.statusbar.padding = {'top': 1, 'bottom': 1, 'left': 0, 'right': 0}
c.statusbar.position = 'top'
c.statusbar.show = 'in-mode'                                # always never in-mode
c.statusbar.widgets = ['keypress', 'url', 'scroll', 'history', 'keypress', 'progress']
#   - url: Current page URL.
#   - scroll: Percentage of the current page position like `10%`.
#   - scroll_raw: Raw percentage of the current page position like `10`.
#   - history: Display an arrow when possible to go back/forward in history.
#   - tabs: Current active tab, e.g. `2`.
#   - keypress: Display pressed keys when composing a vi command.
#   - progress: Progress bar for the current page loading.

# ━  TABS

c.tabs.background = True                                    # Open middleclick tabs in background
c.tabs.close_mouse_button = 'middle'                        # right , middle , none
c.tabs.close_mouse_button_on_bar = 'ignore'                 # new-tab close-current close-last ignore
c.tabs.favicons.scale = 1.0
c.tabs.favicons.show = 'always'                             # always never pinned

# Maximum stack size to remember for tab switches (-1 for no maximum).
c.tabs.focus_stack_size = 10

c.tabs.indicator.padding = {'top': 4, 'bottom': 4, 'left': 0, 'right': 4}

c.tabs.indicator.width = 3

c.tabs.last_close = 'ignore'                                # ignore blank startpage default-page close

c.tabs.max_width = -1
c.tabs.min_width = -1

c.tabs.mode_on_change = 'restore'                           # persist restore normal

c.tabs.mousewheel_switching = True

c.tabs.new_position.related = 'next'                        # prev next first last

c.tabs.new_position.stacking = True
c.tabs.new_position.unrelated = 'last'                      # prev next first last

c.tabs.padding = {'top': 5, 'bottom': 5, 'left': 5, 'right': 5}
c.tabs.pinned.frozen = True
c.tabs.pinned.shrink = True
c.tabs.position = 'top'                                     # top bottom left right

c.tabs.select_on_remove = 'next'                            # prev next last-used

c.tabs.show = 'switching'                                   # always never multiple switching

c.tabs.show_switching_delay = 800

c.tabs.tabs_are_windows = False

c.tabs.title.alignment = 'left'                             # left right center

# Format to use for the tab title.
# The following placeholders are defined:
#   * `{perc}`: Percentage as a string like `[10%]`.
#   * `{perc_raw}`: Raw percentage, e.g. `10`.
#   * `{current_title}`: Title of the current web page.
#   * `{title_sep}`: The string ` - ` if a title is
#     set, empty otherwise.
#   * `{index}`: Index of this tab.
#   * `{id}`: Internal tab ID of this tab.
#   * `{scroll_pos}`: Page scroll position.
#   * `{host}`: Host of the current web page.
#   * `{backend}`: Either ''webkit'' or ''webengine''
#   * `{private}`: Indicates when private mode is enabled.
#   * `{current_url}`: URL of the current web page.
#   * `{protocol}`: Protocol (http/https/...) of the current web page.
#   * `{audio}`: Indicator for audio/mute status.
c.tabs.title.format = '{audio}{private} {current_title}'
c.tabs.title.format_pinned = '{index}'

c.tabs.tooltips = True

# Number of close tab actions to remember, per window (-1 for no maximum).
c.tabs.undo_stack_size = 100

c.tabs.width = '20%'                                        # if vertical

c.tabs.wrap = True

# ━  BINDINGS
# ━━ normal mode
config.bind("'", 'enter-mode jump_mark')
config.bind('+', 'zoom-in')
config.bind('-', 'zoom-out')
config.bind('.', 'repeat-command')
config.bind('/', 'set-cmd-text /')
config.bind(':', 'set-cmd-text :')
config.bind('<Ctrl-l>', 'set-cmd-text -s :open')
config.bind('<Ctrl-r>', 'config-source')
config.bind(';I', 'hint images tab')
config.bind(';O', 'hint links fill :open -t -r {hint-url}')
config.bind(';R', 'hint --rapid links window')
config.bind(';Y', 'hint links yank-primary')
config.bind(';b', 'hint all tab-bg')
config.bind(';d', 'hint links download')
config.bind(';f', 'hint all tab-fg')
config.bind(';h', 'hint all hover')
config.bind(';i', 'hint images')
config.bind(';o', 'hint links fill :open {hint-url}')
config.bind(';r', 'hint --rapid links tab-bg')
config.bind(';t', 'hint inputs')
config.bind(';y', 'hint links yank')

config.bind('<Ctrl-1>',  'tab-focus 1')
config.bind('<Ctrl-2>',  'tab-focus 2')
config.bind('<Ctrl-3>',  'tab-focus 3')
config.bind('<Ctrl-4>',  'tab-focus 4')
config.bind('<Ctrl-5>',  'tab-focus 5')
config.bind('<Ctrl-6>',  'tab-focus 6')
config.bind('<Ctrl-7>',  'tab-focus 7')
config.bind('<Ctrl-8>',  'tab-focus 8')
config.bind('<Ctrl-9>',  'tab-focus -1')
config.bind('<Ctrl-m>',  'tab-mute')
config.bind('<Ctrl-A>',  'navigate increment')
config.bind('<Ctrl-B>',  'scroll-page 0 -1')
config.bind('<Ctrl-D>',  'scroll-page 0 0.5')
config.bind('<Ctrl-F>',  'scroll-page 0 1')
config.bind('<Ctrl-N>',  'open -w')
config.bind('<Ctrl-Q>',  'quit')
config.bind('<Ctrl-T>',  'open -t')
config.bind('<Ctrl-U>',  'scroll-page 0 -0.5')
config.bind('<Ctrl-V>',  'enter-mode passthrough')
config.bind('<Ctrl-W>',  'tab-close')
config.bind('<Ctrl-X>',  'navigate decrement')
config.bind('<Ctrl-^>',  'tab-focus last')
config.bind('<Ctrl-h>',  'home')
config.bind('<Ctrl-p>',  'tab-pin')
config.bind('<Ctrl-s>',  'stop')
config.bind('<Ctrl-F5>', 'reload -f')
config.bind('<Ctrl-Tab>',    'tab-focus last')
config.bind('<Ctrl-Return>', 'follow-selected -t')
config.bind('<Ctrl-PgUp>',   'tab-prev')
config.bind('<Ctrl-PgDown>', 'tab-next')

config.bind('<Ctrl-Shift-N>',   'open -p')
config.bind('<Ctrl-Shift-T>',   'undo')
config.bind('<Ctrl-Shift-Tab>', 'nop')
config.bind('<Ctrl-Shift-W>',   'close')
config.bind('<Ctrl-Alt-p>',     'print')

config.bind('<F5>',      'reload')
config.bind('<F11>',     'fullscreen')
config.bind('<back>',    'back')
config.bind('<forward>', 'forward')
config.bind('<Escape>',  'clear-keychain ;; search ;; fullscreen --leave')
config.bind('<Return>',  'follow-selected')
config.bind('=', 'zoom')
config.bind('?', 'set-cmd-text ?')
config.bind('@', 'run-macro')
config.bind('B', 'set-cmd-text -s :quickmark-load -t')
config.bind('D', 'tab-close -o')
config.bind('F', 'hint all tab')
config.bind('G', 'scroll-to-perc')
config.bind('H', 'back')
config.bind('J', 'tab-next')
config.bind('K', 'tab-prev')
config.bind('gl', 'tab-move -')
config.bind('gm', 'tab-move')
config.bind('gr', 'tab-move +')
config.bind('L', 'forward')
config.bind('M', 'bookmark-add')
config.bind('N', 'search-prev')
config.bind('O', 'set-cmd-text -s :open -t')
config.bind('PP', 'open -t -- {primary}')
config.bind('Pp', 'open -t -- {clipboard}')
config.bind('R', 'reload -f')
config.bind('Sb', 'open qute://bookmarks#bookmarks')
config.bind('Sh', 'open qute://history')
config.bind('Sq', 'open qute://bookmarks')
config.bind('Ss', 'open qute://settings')
config.bind('T', 'tab-focus')
config.bind('V', 'enter-mode caret ;; toggle-selection --line')
config.bind('ZQ', 'quit')
config.bind('ZZ', 'quit --save')
config.bind('[[', 'navigate prev')
config.bind(']]', 'navigate next')
config.bind('`', 'enter-mode set_mark')
config.bind('ad', 'download-cancel')
config.bind('b', 'set-cmd-text -s :quickmark-load')
config.bind('cd', 'download-clear')
config.bind('co', 'tab-only')
config.bind('d', 'tab-close')
config.bind('f', 'hint')
config.bind('g$', 'tab-focus -1')
config.bind('g0', 'tab-focus 1')
config.bind('gB', 'set-cmd-text -s :bookmark-load -t')
config.bind('gC', 'tab-clone')
config.bind('gD', 'tab-give')
config.bind('gO', 'set-cmd-text :open -t -r {url:pretty}')
config.bind('gU', 'navigate up -t')
config.bind('g^', 'tab-focus 1')
config.bind('ga', 'open -t')
config.bind('gb', 'set-cmd-text -s :bookmark-load')
config.bind('gd', 'download')
config.bind('gf', 'view-source')
config.bind('gg', 'scroll-to-perc 0')
config.bind('gi', 'hint inputs --first')
config.bind('go', 'set-cmd-text :open {url:pretty}')
config.bind('gt', 'set-cmd-text -s :buffer')
config.bind('gu', 'navigate up')
config.bind('h', 'scroll left')
config.bind('i', 'enter-mode insert')
config.bind('j', 'scroll down')
config.bind('k', 'scroll up')
config.bind('l', 'scroll right')
config.bind('m', 'quickmark-save')
config.bind('n', 'search-next')
config.bind('o', 'set-cmd-text -s :open')
config.bind('pP', 'open -- {primary}')
config.bind('pp', 'open -- {clipboard}')
config.bind('q', 'record-macro')
config.bind('r', 'reload')
config.bind('sf', 'save')
config.bind('sk', 'set-cmd-text -s :bind')
config.bind('sl', 'set-cmd-text -s :set -t')
config.bind('ss', 'set-cmd-text -s :set')
config.bind('tCH', 'config-cycle -p -u *://*.{url:host}/* content.cookies.accept all no-3rdparty never ;; reload')
config.bind('tCh', 'config-cycle -p -u *://{url:host}/* content.cookies.accept all no-3rdparty never ;; reload')
config.bind('tCu', 'config-cycle -p -u {url} content.cookies.accept all no-3rdparty never ;; reload')
config.bind('tIH', 'config-cycle -p -u *://*.{url:host}/* content.images ;; reload')
config.bind('tIh', 'config-cycle -p -u *://{url:host}/* content.images ;; reload')
config.bind('tIu', 'config-cycle -p -u {url} content.images ;; reload')
config.bind('tPH', 'config-cycle -p -u *://*.{url:host}/* content.plugins ;; reload')
config.bind('tPh', 'config-cycle -p -u *://{url:host}/* content.plugins ;; reload')
config.bind('tPu', 'config-cycle -p -u {url} content.plugins ;; reload')
config.bind('tSH', 'config-cycle -p -u *://*.{url:host}/* content.javascript.enabled ;; reload')
config.bind('tSh', 'config-cycle -p -u *://{url:host}/* content.javascript.enabled ;; reload')
config.bind('tSu', 'config-cycle -p -u {url} content.javascript.enabled ;; reload')
config.bind('tcH', 'config-cycle -p -t -u *://*.{url:host}/* content.cookies.accept all no-3rdparty never ;; reload')
config.bind('tch', 'config-cycle -p -t -u *://{url:host}/* content.cookies.accept all no-3rdparty never ;; reload')
config.bind('tcu', 'config-cycle -p -t -u {url} content.cookies.accept all no-3rdparty never ;; reload')
config.bind('th', 'back -t')
config.bind('tiH', 'config-cycle -p -t -u *://*.{url:host}/* content.images ;; reload')
config.bind('tih', 'config-cycle -p -t -u *://{url:host}/* content.images ;; reload')
config.bind('tiu', 'config-cycle -p -t -u {url} content.images ;; reload')
config.bind('tl', 'forward -t')
config.bind('tpH', 'config-cycle -p -t -u *://*.{url:host}/* content.plugins ;; reload')
config.bind('tph', 'config-cycle -p -t -u *://{url:host}/* content.plugins ;; reload')
config.bind('tpu', 'config-cycle -p -t -u {url} content.plugins ;; reload')
config.bind('tsH', 'config-cycle -p -t -u *://*.{url:host}/* content.javascript.enabled ;; reload')
config.bind('tsh', 'config-cycle -p -t -u *://{url:host}/* content.javascript.enabled ;; reload')
config.bind('tsu', 'config-cycle -p -t -u {url} content.javascript.enabled ;; reload')
config.bind('u', 'undo')
config.bind('v', 'enter-mode caret')
config.bind('wB', 'set-cmd-text -s :bookmark-load -w')
config.bind('wIh', 'devtools left')
config.bind('wIj', 'devtools bottom')
config.bind('wIk', 'devtools top')
config.bind('wIl', 'devtools right')
config.bind('wIw', 'devtools window')
config.bind('wO', 'set-cmd-text :open -w {url:pretty}')
config.bind('wP', 'open -w -- {primary}')
config.bind('wb', 'set-cmd-text -s :quickmark-load -w')
config.bind('wf', 'hint all window')
config.bind('wh', 'back -w')
config.bind('wi', 'devtools')
config.bind('wl', 'forward -w')
config.bind('wo', 'set-cmd-text -s :open -w')
config.bind('wp', 'open -w -- {clipboard}')
config.bind('xO', 'set-cmd-text :open -b -r {url:pretty}')
config.bind('xo', 'set-cmd-text -s :open -b')
config.bind('yD', 'yank domain -s')
config.bind('yM', 'yank inline [{title}]({url}) -s')
config.bind('yP', 'yank pretty-url -s')
config.bind('yT', 'yank title -s')
config.bind('yY', 'yank -s')
config.bind('yd', 'yank domain')
config.bind('ym', 'yank inline [{title}]({url})')
config.bind('yp', 'yank pretty-url')
config.bind('yt', 'yank title')
config.bind('yy', 'yank')
config.bind('{{', 'navigate prev -t')
config.bind('}}', 'navigate next -t')

# ━━ caret mode
config.bind('$', 'move-to-end-of-line', mode='caret')
config.bind('0', 'move-to-start-of-line', mode='caret')
config.bind('<Ctrl-Space>', 'drop-selection', mode='caret')
config.bind('<Escape>', 'leave-mode', mode='caret')
config.bind('<Return>', 'yank selection', mode='caret')
config.bind('<Space>', 'toggle-selection', mode='caret')
config.bind('G', 'move-to-end-of-document', mode='caret')
config.bind('H', 'scroll left', mode='caret')
config.bind('J', 'scroll down', mode='caret')
config.bind('K', 'scroll up', mode='caret')
config.bind('L', 'scroll right', mode='caret')
config.bind('V', 'toggle-selection --line', mode='caret')
config.bind('Y', 'yank selection -s', mode='caret')
config.bind('[', 'move-to-start-of-prev-block', mode='caret')
config.bind(']', 'move-to-start-of-next-block', mode='caret')
config.bind('b', 'move-to-prev-word', mode='caret')
config.bind('c', 'enter-mode normal', mode='caret')
config.bind('e', 'move-to-end-of-word', mode='caret')
config.bind('gg', 'move-to-start-of-document', mode='caret')
config.bind('h', 'move-to-prev-char', mode='caret')
config.bind('j', 'move-to-next-line', mode='caret')
config.bind('k', 'move-to-prev-line', mode='caret')
config.bind('l', 'move-to-next-char', mode='caret')
config.bind('o', 'reverse-selection', mode='caret')
config.bind('v', 'toggle-selection', mode='caret')
config.bind('w', 'move-to-next-word', mode='caret')
config.bind('y', 'yank selection', mode='caret')
config.bind('{', 'move-to-end-of-prev-block', mode='caret')
config.bind('}', 'move-to-end-of-next-block', mode='caret')

# ━━ command mode
config.bind('<Alt-B>', 'rl-backward-word', mode='command')
config.bind('<Alt-Backspace>', 'rl-backward-kill-word', mode='command')
config.bind('<Alt-D>', 'rl-kill-word', mode='command')
config.bind('<Alt-F>', 'rl-forward-word', mode='command')
config.bind('<Ctrl-?>', 'rl-delete-char', mode='command')
config.bind('<Ctrl-A>', 'rl-beginning-of-line', mode='command')
config.bind('<Ctrl-B>', 'rl-backward-char', mode='command')
config.bind('<Ctrl-C>', 'completion-item-yank', mode='command')
config.bind('<Ctrl-D>', 'completion-item-del', mode='command')
config.bind('<Ctrl-E>', 'rl-end-of-line', mode='command')
config.bind('<Ctrl-F>', 'rl-forward-char', mode='command')
config.bind('<Ctrl-H>', 'rl-backward-delete-char', mode='command')
config.bind('<Ctrl-K>', 'rl-kill-line', mode='command')
config.bind('<Ctrl-N>', 'command-history-next', mode='command')
config.bind('<Ctrl-P>', 'command-history-prev', mode='command')
config.bind('<Ctrl-Return>', 'command-accept --rapid', mode='command')
config.bind('<Ctrl-Shift-C>', 'completion-item-yank --sel', mode='command')
config.bind('<Ctrl-Shift-Tab>', 'completion-item-focus prev-category', mode='command')
config.bind('<Ctrl-Tab>', 'completion-item-focus next-category', mode='command')
config.bind('<Ctrl-U>', 'rl-unix-line-discard', mode='command')
config.bind('<Ctrl-W>', 'rl-unix-word-rubout', mode='command')
config.bind('<Ctrl-Y>', 'rl-yank', mode='command')
config.bind('<Down>', 'completion-item-focus --history next', mode='command')
config.bind('<Escape>', 'leave-mode', mode='command')
config.bind('<Return>', 'command-accept', mode='command')
config.bind('<Shift-Delete>', 'completion-item-del', mode='command')
config.bind('<Shift-Tab>', 'completion-item-focus prev', mode='command')
config.bind('<Tab>', 'completion-item-focus next', mode='command')
config.bind('<Up>', 'completion-item-focus --history prev', mode='command')

# ━━ hint mode
config.bind('<Ctrl-B>', 'hint all tab-bg', mode='hint')
config.bind('<Ctrl-F>', 'hint links', mode='hint')
config.bind('<Ctrl-R>', 'hint --rapid links tab-bg', mode='hint')
config.bind('<Escape>', 'leave-mode', mode='hint')
config.bind('<Return>', 'follow-hint', mode='hint')

# ━━ insert mode
config.bind('<Ctrl-E>',    'open-editor', mode='insert')
config.bind('<Escape>',    'leave-mode', mode='insert')
config.bind('<Shift-Ins>', 'insert-text -- {primary}', mode='insert')

# ━━ passthrough mode
config.bind('<Shift-Escape>', 'leave-mode', mode='passthrough')

# ━━ prompt mode
config.bind('<Alt-B>', 'rl-backward-word', mode='prompt')
config.bind('<Alt-Backspace>', 'rl-backward-kill-word', mode='prompt')
config.bind('<Alt-D>', 'rl-kill-word', mode='prompt')
config.bind('<Alt-F>', 'rl-forward-word', mode='prompt')
config.bind('<Alt-Shift-Y>', 'prompt-yank --sel', mode='prompt')
config.bind('<Alt-Y>', 'prompt-yank', mode='prompt')
config.bind('<Ctrl-?>', 'rl-delete-char', mode='prompt')
config.bind('<Ctrl-A>', 'rl-beginning-of-line', mode='prompt')
config.bind('<Ctrl-B>', 'rl-backward-char', mode='prompt')
config.bind('<Ctrl-E>', 'rl-end-of-line', mode='prompt')
config.bind('<Ctrl-F>', 'rl-forward-char', mode='prompt')
config.bind('<Ctrl-H>', 'rl-backward-delete-char', mode='prompt')
config.bind('<Ctrl-K>', 'rl-kill-line', mode='prompt')
config.bind('<Ctrl-P>', 'prompt-open-download --pdfjs', mode='prompt')
config.bind('<Ctrl-U>', 'rl-unix-line-discard', mode='prompt')
config.bind('<Ctrl-W>', 'rl-unix-word-rubout', mode='prompt')
config.bind('<Ctrl-X>', 'prompt-open-download', mode='prompt')
config.bind('<Ctrl-Y>', 'rl-yank', mode='prompt')
config.bind('<Down>', 'prompt-item-focus next', mode='prompt')
config.bind('<Escape>', 'leave-mode', mode='prompt')
config.bind('<Return>', 'prompt-accept', mode='prompt')
config.bind('<Shift-Tab>', 'prompt-item-focus prev', mode='prompt')
config.bind('<Tab>', 'prompt-item-focus next', mode='prompt')
config.bind('<Up>', 'prompt-item-focus prev', mode='prompt')

# ━━ register mode
config.bind('<Escape>', 'leave-mode', mode='register')

# ━━ yesno mode
config.bind('<Alt-Shift-Y>', 'prompt-yank --sel', mode='yesno')
config.bind('<Alt-Y>',       'prompt-yank', mode='yesno')
config.bind('<Escape>',      'leave-mode', mode='yesno')
config.bind('<Return>',      'prompt-accept', mode='yesno')
config.bind('N',             'prompt-accept --save no', mode='yesno')
config.bind('Y',             'prompt-accept --save yes', mode='yesno')
config.bind('n',             'prompt-accept no', mode='yesno')
config.bind('y',             'prompt-accept yes', mode='yesno')
