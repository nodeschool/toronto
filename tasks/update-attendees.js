
// Setup
var fs          = require( 'fs' );
var config      = require( '../config' );
var async       = require( 'async' );
var request     = require( 'superagent' );
var lodash      = require( 'lodash' );
var gravatar    = require( 'gravatar' );
var colors      = require( 'colors' );
var attendees   = {};

// Get events
request
  .get( 'https://api.tito.io/timeline?auth_token=' + config.auth_token )
  .set('accept', 'application/json')
  .end( function( err, res ) {
    // Iterate over events
    async.each( res.body.events, function( event, callback ) {
      // Get registrations
      request.get( event.api_url + '/registrations?auth_token=' + config.auth_token )
        .set('accept', 'application/json')
        .end( function( err, res ) {
          // Iterate over attendees
          res.body.registrations.forEach( function ( attendee ) {
            if( !attendees[ attendee.email ] ) {
              attendees[ attendee.email ] = 0;
            }
            attendees[ attendee.email ]++;
          });
          callback();
        });
    }, function () {
      // Sort by events attended
      var sorted = [];
      var id = 0;
      async.forEachOf( attendees, function( count, email, callback ) {
        var image = gravatar.url( email, { s: '300', r: 'x', d: '404' }, true );
        request.get( image )
          .end( function ( err, res ) {
            if( res.status === 200 ) {
              sorted.push( [ id, image, count ] );
              id++;
            }
            callback();
          });
      }, function (){
        sorted.sort( function( a, b ) {
          return b[ 2 ] - a[ 2 ]
        });
        // Write to file
        var content = JSON.stringify( { attendees: sorted } );
        fs.writeFileSync( './_data/attendees.json', content );
        console.log( './_data/attendees.json'.yellow + ' was updated successfully!'.green )
      });
    });
  });
