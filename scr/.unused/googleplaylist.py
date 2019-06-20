#!/usr/bin/env python
import sys, os, netrc, sqlite3
from gmusicapi import Mobileclient
Api = Mobileclient()

sqlite_path = "/var/cache/mt-daapd/songs3.db"
plist_dir = "/mp3/m3u"

def init():
    api = Api()
    (email, account, password) = netrc.netrc().hosts['google.com']
    logged_in = api.login(email, password)
    if not logged_in:
        api = None
    return api

def create_playlist(file_path, songs):
    f = open(file_path, 'w')
    conn = sqlite3.connect(sqlite_path)
    for song in songs:
        c = conn.cursor()
        c.execute(u'select path from songs where artist=? and title=?', [song['artist'], song['name']])
        paths = c.fetchall()
        for path in paths:
            f.write(path[0].encode('utf-8', 'ignore'))
            f.write("\n")
    conn.close()
    f.close()

def main():
    comm = sys.argv[1]
    api = init()
    if api == None:
        print "login error"
        return

    lists = api.get_all_playlist_ids()['user']

    if comm == "show":
        for pl in lists:
            print pl
        return

    plist_name = comm
    if not plist_name in lists:
        print "playlist named \"%s\" not found" % plist_name
        return

    plist_path = os.path.join(plist_dir, "%s.m3u" % plist_name)
    print "create playlist : %s" % plist_path
    songs = api.get_playlist_songs(pid)
    create_playlist(plist_path, songs)
         
if __name__ == '__main__':
    main() 
