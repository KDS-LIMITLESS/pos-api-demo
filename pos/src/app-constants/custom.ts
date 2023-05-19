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
     * Characters used to generate ID for orders
     */
    ID_CHARS = '0123456789',

    /**
     * Creation failed
     */
    CREATION_FAIL = 'Creation failed',

    /**
     * The specified item could not be found
     */
    DOES_NOT_EXIST = "What you're looking for doesn't exist",

    ITEM_ALREADY_EXISTS = "ITEM ALREADY EXISTS"

}
export default AppConstants;
