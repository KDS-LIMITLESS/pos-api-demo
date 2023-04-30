enum AppConstants  {

    /**
     * The specified email already exists in the server
     */
    USER_EXISTS = 'An account with email already exists',

    /**
     * The Authourization header is missing or is not valid
     */
    BAD_AUTH_HEADERS = 'Bad or missing authourization headers',

    /**
     * The Email or password provided is incorrect
     */
    INVALID_LOGIN_DETAILS = 'Invalid login details.',
    /**
     * Input fields are incomplete or have invalid types
     */
    BAD_INPUT_FILED = 'Incorrect or incomplete input fields',

    /**
     * Characters used to generate restaurant ID
     */
    ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',

    /**
     * Creation of the restaurant failed
     */
    CREATION_FAIL = 'Restaurant creation failed',

    /**
     * The specified restaurant could not be found
     */
    DOES_NOT_EXIST = "The Restaurant you're looking for doesn't exist"

}
export default AppConstants;