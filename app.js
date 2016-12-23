var main = function() {
    // Game state data
    var num_players;

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
    $('a#calculate').bind('click', get_number);

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
    };
    get_names = function() {

    };
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
