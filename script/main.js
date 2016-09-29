/**
 * Created by pavlo on 29.09.16.
 */

function main() {
    $('#login').hide();

    // Toggle between sign up and log in tabs
    $('a').on('click', function (e) {
        e.preventDefault();

        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');

        target = $(this).attr('href');

        $('.tabs > div').not(target).hide();

        $(target).fadeIn(600);
    });

    // Events hendler for form and inputs
    $('.form').find('input').on('keyup blur focus', function (e) {

        var $this = $(this),
            label = $this.prev('label');

        if (e.type === 'keyup') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.addClass('active highlight');
            }
        } else if (e.type === 'blur') {
            if( $this.val() === '' ) {
                label.removeClass('active highlight');
            } else {
                label.removeClass('highlight');
            }
        } else if (e.type === 'focus') {
            $('#signUpHeader').css('color', 'white');
            $('#signUpHeader').text('Sign Up');

            $('#logInHeader').css('color', 'white');
            $('#logInHeader').text('Log In');

            if( $this.val() === '' ) {
                label.removeClass('highlight');
            }
            else if( $this.val() !== '' ) {
                label.addClass('highlight');
            }
        }

    });

    // Event handler for sign up button. This method checks inputs on validate signs.
    // If user not exists data of user is saved in cookies.
    $('#signupButton').on('click', function () {
        var firstName = $('#firstname').val();
        var lastName = $('#lastname').val();
        var email = $('#email').val();
        var country = $('#country').val();
        var city = $('#city').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirmPassword').val();

        var alphabetRegex = /^[a-zA-Z]+$/;
        var emailRegex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var add_regex = /^[0-9a-zA-Z]+$/;
        var passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/;

        if (firstName.length == 0) {
            $('#labelFirstName').text("* All fields are mandatory *");
            $('#labelFirstName').css('color', 'red');
            $("#firstname").focus();
            return false;
        } else if (!firstName.match(alphabetRegex) || firstName.length == 0) {
            $('#labelFirstName').text("* For your first name please use alphabets only *");
            $('#labelFirstName').css('color', 'red');
            $("#firstname").focus();
            return false;
        } else if (!lastName.match(alphabetRegex) || lastName.length == 0) {
            $('#labelLastName').text("* For your last name please use alphabets only *");
            $('#labelLastName').css('color', 'red');
            $("#lastname").focus();
            return false;
        } else if (!email.match(emailRegex) || email.length == 0) {
            $('#labelEmail').text("* Please enter a valid email address *");
            $('#labelEmail').css('color', 'red');
            $("#email").focus();
            return false;
        } else if (!country.match(alphabetRegex) || country.length == 0) {
            $('#labelCountry').text("* For your country please use alphabets only *");
            $('#labelCountry').css('color', 'red');
            $("#country").focus();
            return false;
        } else if (!city.match(alphabetRegex) || city.length == 0) {
            $('#labelCity').text("* For your city please use alphabets only *");
            $('#labelCity').css('color', 'red');
            $("#city").focus();
            return false;
        } else if (!password.match(passwordRegex) || password.length == 0) {
            $('#labelSetPassword').text("* For your password please use upper- lowercases and num's *");
            $('#labelSetPassword').css('color', 'red');
            $("#password").focus();
            return false;
        } else if (!confirmPassword.match(passwordRegex) || confirmPassword.length == 0 || confirmPassword !== password) {
            $('#labelConfirmPassword').text("* Confirm password *");
            $('#labelConfirmPassword').css('color', 'red');
            $("#confirmPassword").focus();
            return false;
        } else {
            var user = new Object();
            user.first_name = firstName;
            user.last_name = lastName;
            user.email = email;
            user.country = country;
            user.city = city;
            user.password = password;

            if (!readCookie(email)) {
                var jsonUser = JSON.stringify(user);
                document.cookie = email + "=" + jsonUser;
                openProfile(user);
            } else {
                $('#signUpHeader').text("User with " + email + " email already exist!");
                $('#signUpHeader').css('color', 'red');
                $('#signUpHeader').focus();
            }
        }
    });

    // Event handler for login button. If user exists in cookies opened page with user's profile.
    $('#loginButton').on('click', function () {
        var email = $('#emailInput').val();
        var password = $('#passwordInput').val();

        var object = readCookie(email);
        if (object && object.password === password) {
            openProfile(object);
        } else {
            $('#logInHeader').text("Password or email is wrong or user is not exist!");
            $('#logInHeader').css('color', 'red');
            $('#logInHeader').focus();
        }
    });

    // Method that opens new page with user data.
    // Parameters of user given using url string parameters.
    function openProfile(user) {
        var parameters = "?firstName=" + user.first_name +
            "&lastName=" + user.last_name +
            "&email=" + user.email +
            "&country=" + user.country +
            "&city=" + user.city;
        window.open('profile.html' + parameters, '_self');
    }

    // Method that read coockies using name.
    function readCookie(name) {
        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        result && (result = JSON.parse(result[1]));
        return result;
    }
}

$(document).readyState(main());