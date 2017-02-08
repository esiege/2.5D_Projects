'use strict';

app.service( 'structureService', function ( card_body, placementTileService, canvasService, queryFactory )
{

    var userStructures = {};
    for ( var i = 1; i <= 6; i++ ) {
        userStructures["spot" + i] = {
            id: null,
            pos: i
        }
    }
    var opponentStructures = {};
    for ( var i = 1; i <= 6; i++ ) {
        opponentStructures["spot" + i] = {
            id: null,
            pos: i
        }
    }
    var setAll = function ( structures, func )
    {
        for ( var i = 1; i <= 5; i++ ) {
            if ( structures["spot" + i].id )
                func( structures["spot" + i] );
        }
    }
    var setAllRev = function ( structures, func )
    {
        for ( var i = 5; i > 0; i-- ) {
            if ( structures["spot" + i].id )
                func( structures["spot" + i] );
        }
    }
    var shiftTileRight = function ( b_tile )
    {
        updateFunctions = _.filter( updateFunctions, function ( val ) { return val != b_tile.updateFunction } );
        b_tile.updateFunction = {
            execute: function ( params )
            {
                this.params.accelerateAndStop = function ( params )
                {
                    if ( !params.b_tile.floorTileRight )
                        return

                    if ( params.b_tile.b_structure.body.getPos().x < params.b_tile.floorTileRight.body.getPos().x ) {
                        params.shiftCnt == undefined ? params.shiftCnt = 16 : params.shiftCnt += 2;
                        params.b_tile.b_structure.body.setForce( { x: params.shiftCnt / 2, y: 0 } );
                    }
                    else {
                        params.b_tile.b_structure.body.setForce( { x: 0, y: 0 } );
                        params.b_tile.b_structure.body.setPos( { x: params.b_tile.floorTileRight.body.getPos().x, y: params.b_tile.floorTileRight.body.getPos().y - 35 } );
                        this.persist = false;
                    }
                }
                this.params.accelerateAndStop( this.params );
            },
            params: {
                b_tile: b_tile,
                persist: true
            }
        };
        updateFunctions.push( b_tile.updateFunction );
    }
    var shiftTileBack = function ( b_tile )
    {
        updateFunctions = _.filter( updateFunctions, function ( val ) { return val != b_tile.updateFunction } );
        b_tile.updateFunction = {
            execute: function ( params )
            {
                this.params.accelerateAndStop = function ( params )
                {
                    if ( params.b_tile.b_structure.body.getPos().x > params.b_tile.body.getPos().x ) {
                        params.shiftCnt == undefined ? params.shiftCnt = 16 : params.shiftCnt += 2;
                        params.b_tile.b_structure.body.setForce( { x: -params.shiftCnt / 2, y: 0 } );
                    }
                    else {
                        params.b_tile.b_structure.body.setForce( { x: 0, y: 0 } );
                        params.b_tile.b_structure.body.setPos( { x: params.b_tile.body.getPos().x, y: params.b_tile.body.getPos().y - 35 } );
                        this.persist = false;
                    }
                }
                this.params.accelerateAndStop( this.params );
            },
            params: {
                b_tile: b_tile,
                persist: true
            }
        };
        updateFunctions.push( b_tile.updateFunction );
    }
    var getStructureCount = function ( structures )
    {
        var ret = 0;
        for ( var i = 1; i <= 6; i++ ) {
            if ( structures["spot" + i].id )
                ret++;
        }
        return ret;
    }
    var getStructureById = function ( id )
    {
        for ( var i = 1; i <= 6; i++ ) {
            if ( userStructures["spot" + i].id == id ) {
                userStructures["spot" + i].friendly = true;
                return userStructures["spot" + i];
            }
            if ( opponentStructures["spot" + i].id == id ) {
                opponentStructures["spot" + i].friendly = false;
                return opponentStructures["spot" + i];
            }
        }
        return null;
    }
    var getStructureByPos = function ( structures, pos )
    {
        if ( !structures["spot" + pos] )
            return null;

        structures["spot" + pos].pos = pos;
        return structures["spot" + pos];
    }

    var returnFromHover = function ()
    {
        setAllRev( userStructures, function ( structure )
        {
            shiftTileBack( structure.b_tile );
        } );
    }
    var updateStructures = function ( canvas, existingStructures, newStructures, floorTiles, friendly )
    {

        for ( var i = 0; i < updateFunctions.length; i++ ) {
            if ( updateFunctions[i].params.b_tile ) {
                updateFunctions.splice( i, 1 );
                i--;
            }
        }

        //adjust all towers based on server values
        //log:
        var debugLogObjects = false;

        var tempStructures = {};
        for ( var ss in newStructures ) {
            var serverStruct = newStructures[ss];
            tempStructures["spot" + serverStruct.pos] = {
                id: serverStruct.id
            }
            var clientStruct = getStructureByPos( existingStructures, serverStruct.pos );

            if ( serverStruct.id ) {
                var pos = serverStruct.pos;

                if ( debugLogObjects ) { console.log( "--------------------- " + pos + " ----------------------" ); console.log( "serverStruct:" ); console.log( serverStruct ); console.log( "clientStruct Before:" ); console.log( clientStruct ); }

                //structure didnt move
                if ( serverStruct.id == clientStruct.id && serverStruct.id != null ) {
                    tempStructures["spot" + pos] = existingStructures["spot" + pos];
                    tempStructures["spot" + pos].body.setForce( { x: 0, y: 0 } );
                    tempStructures["spot" + pos].body.setPos( {
                        x: floorTiles["tile" + pos].body.getPos().x,
                        y: floorTiles["tile" + pos].body.getPos().y - 35,
                    } );
                    floorTiles["tile" + pos].b_structure = tempStructures["spot" + pos];
                    floorTiles["tile" + pos].b_structure.b_tile = floorTiles["tile" + pos];
                }
                else if ( serverStruct.id !== clientStruct.id ) {
                    //structure has moved
                    var existingStructure = getStructureById( serverStruct.id );
                    if ( existingStructure && existingStructure.id ) {
                        tempStructures["spot" + pos] = existingStructures["spot" + existingStructure.pos];
                        tempStructures["spot" + pos].body.setForce( { x: 0, y: 0 } );
                        tempStructures["spot" + pos].body.setPos( {
                            x: floorTiles["tile" + pos].body.getPos().x,
                            y: floorTiles["tile" + pos].body.getPos().y - 35,
                        } );
                        tempStructures["spot" + pos].pos = pos;
                        floorTiles["tile" + pos].b_structure = tempStructures["spot" + pos];
                        floorTiles["tile" + pos].b_structure.b_tile = floorTiles["tile" + pos];
                    }
                        //create new structure
                    else {
                        tempStructures["spot" + pos] = card_body.init( {
                            x: floorTiles["tile" + pos].body.getPos().x,
                            y: floorTiles["tile" + pos].body.getPos().y - 35,
                            b_tile: floorTiles["tile" + pos],
                            z: 1,
                            width: 70,
                            height: 140,
                            id: serverStruct.id,
                            pos: pos,
                            color: 'rgb(' + ( ( serverStruct.id * 100 ) % 255 ) + ", " + ( ( serverStruct.id * 300 ) % 255 ) + ", " + ( ( serverStruct.id * 500 ) % 255 ) + ")",
                            image: "images/card/structure.png",
                            scale: 0.2,
                            flipX: friendly,
                            name: 'placed' + serverStruct.id,
                            canvas: canvas,
                            groupIndex: -1,
                        } );
                        floorTiles["tile" + pos].b_structure = tempStructures["spot" + pos];
                        floorTiles["tile" + pos].b_structure.b_tile = floorTiles["tile" + pos];
                    }

                    if ( debugLogObjects ) { console.log( "clientStruct After:" ); console.log( clientStruct ); console.log( "clientStruct Temp Value After:" ); console.log( tempStructures["spot" + pos] ); }
                }
            }
        }
        return tempStructures;

    };

    return {
        init: function ( canvas )
        {
        },
        updateStructures: function ()
        {
            canvasService.ready( function ( canvas )
            {
                queryFactory.query( 'structure:get', { sid: 1 }, function ( data )
                {

                    //TODO: temp to reuse duplicate ids for mirror test
                    for ( var j = 1; j <= 6; j++ ) {
                        if ( data.opponentStructures["spot" + j].id )
                            data.opponentStructures["spot" + j].id = -data.opponentStructures["spot" + j].id;
                    }

                    userStructures = updateStructures(canvas, userStructures, data.userStructures, placementTileService.userFloorTiles, true);
                    opponentStructures = updateStructures(canvas, opponentStructures, data.opponentStructures, placementTileService.opponentFloorTiles, false);
                } );
            } );
        },
        add: function ( pos, cardId, callback )
        {
            returnFromHover();
            queryFactory.query( 'structure:built', { pos: pos, cardId: cardId, sid: 1 }, function ( results )
            {
                callback( results );

                canvasService.ready( function ( canvas )
                {
                    queryFactory.query( 'structure:get', { sid: 1 }, function ( data ) {
                        userStructures = updateStructures(canvas, userStructures, data.userStructures, placementTileService.userFloorTiles, true);
                    } );
                } );

                if ( results && results.error )
                    console.error( results );

            } );
        },
        hover: function ( pos )
        {
            if ( getStructureCount( userStructures ) == 6 )
                return;

            var shiftTiles = [];
            var s = getStructureByPos( userStructures, pos );

            while ( s.b_tile && s.b_tile.b_structure ) {
                shiftTiles.push( s.b_tile );
                s = getStructureByPos( userStructures, pos++ );
                if ( !s ) {
                    shiftTiles = [];
                    break;
                }
            }
            for ( var i = 0; i < shiftTiles.length; i++ ) {
                shiftTileRight( shiftTiles[i] );
            }


            setAll( userStructures, function ( structure )
            {

                var isShifting = false;
                for ( var i = 0; i < shiftTiles.length; i++ ) {
                    if ( structure.id == shiftTiles[i].b_structure.id )
                        isShifting = true;
                }

                if ( !isShifting ) {
                    shiftTileBack( structure.b_tile );
                }

            } );
        },
        //spawn: function ( structureId, minionId )
        //{
        //    //TODO: temp to reuse duplicate ids for mirror test
        //    var structure = getStructureById( -structureId );
        //    minionService.addFromStructure( structure , minionId);

        //    var structure2 = getStructureById( structureId );
        //    minionService.addFromStructure(structure2, minionId);

        //},
        returnFromHover: returnFromHover,
        getStructureById: getStructureById
    }

} );
