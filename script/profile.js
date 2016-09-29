/**
 * Created by pavlo on 29.09.16.
 */

function main() {
    var parameters = window.location.href.split("?")[1].split("&");
    for (var i = 0; i < parameters.length; i++) {
        var parameter = parameters[i].split("=");
        switch (parameter[0]) {
            case 'firstName':
                $('#firstNameLabel').append(' ' + parameter[1]);
                break;
            case 'lastName':
                $('#lastNameLabel').append(' ' + parameter[1]);
                break;
            case 'email':
                $('#emailLabel').append(' ' + parameter[1]);
                break;
            case 'country':
                $('#countryLabel').append(' ' + parameter[1]);
                break;
            case 'city':
                $('#cityLabel').append(' ' + parameter[1]);
                break;
            default:
                break;
        }
    }

    $('#logoutButton').on('click', function (e) {
        window.open('main.html', '_self');
    });
}

$(document).ready(main());