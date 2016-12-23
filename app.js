var main = function() {
    // Game state data
    var num_players;
    var names = [];

    // Functions
    var get_number;
    var show_get_names;
    var get_names;
    var show_get_role_set;
    var get_role_set;
    var show_pass_to;
    var pass_to;
    var show_give_role;
    var give_role;
    var show_done;
    var done;

    get_number = function() {
        num_players = $('input[name="num_players"]').val();

        show_get_names();
        /* $.getJSON($SCRIPT_ROOT + '/setNumPlayers', {
         *     a: $('input[name="a"]').val(),
         *     b: $('input[name="b"]').val()
         * }, function(data) {

         *     $('#result').text(data.result);
         *     $('input[name=a]').focus().select();
         * });*/
    };
    $('a#num_players_button').bind('click', get_number);

    /* $('input[type=text]').bind('keydown', function(e) {
     *     if (e.keyCode == 13) {
     *         submit_form(e);
     *     }
     * });*/
    $('input[name=num_players]').focus();


    show_get_names = function() {
        $('.num_players_screen').animate({
            left: "-300px"
        }, 200);

        // Populate the page with text boxes for player names
        for(var i = num_players - 1; i >= 0; i--){
            $('.get_names_screen').prepend(
                '<input type="text" name="name' + String(i) + '"> <br>'
            );
        }

        $('.get_names_screen').animate({
            left: "0px"
        }, 200);
    };
    get_names = function() {
        for(var i = 0; i < num_players; i++){
            names.push($('input[name="name' + String(i) + '"]').val());
        }
        show_get_role_set();
    };
    $('a#get_players_button').bind('click', get_names);

    show_get_role_set = function() {

    };
    get_role_set = function() {

    };
    show_pass_to = function() {

    };
    pass_to = function() {

    };
    show_give_role = function() {

    };
    give_role = function() {

    };
    show_done = function() {

    };
    done = function() {

    };
};

$(document).ready(main);
