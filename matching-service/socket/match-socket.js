/*
TODO

===FLOW===
    user chooses difficulty, then browser sends req
    POST /api/match/create
    - req.body = user + diff
    - res = matchid

    backend publishes to internal socket 'match' that new match is added, then runs logic to check if a pair is found in db
    backend creating new match also invokes callback to remove after 30s
    backend also creates a socket 'match-${userid}' for browser to listen to matchign status
    browser will also run for 30s, while listening to socket 'match-${userid}'

    if match_id is sent through socket 'match-${userid}', then broswer will move to room page and call get match_id to obtain room data

    GET /api/room/roomid
    - res: room details
    browser can then render partner details, and question

    once user is done
    DELETE /api/room/roomid
    - res: HTTP_OK
    backend sends terminating message and closes room roomid

===REQ WORK===
    - internal 'match' room to handle new matches present
    - 'match-${userid}' for browser to check on status for 30s
        - success will provide roomid to enter into
    - 'room-${roomid}' to handle room
        - if user terminates, then room closes
*/
