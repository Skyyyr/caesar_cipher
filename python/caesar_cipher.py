import string
# We could add punctuation, and digits if we wanted as well.
alphabets = (string.ascii_lowercase, string.ascii_uppercase)

def caesar_cipher(string, shift_amount):
    """This function contains a nested function that shifts (essentially slices) our alphabet
    the amount of times that the shift amount value is.

    Args:
        string (string): String to cipher
        shift_amount (int): Shift amount by int
    """

    # Shift the alphabet map
    def shift(alphabet):
        return alphabet[shift_amount:] + alphabet[:shift_amount]

    # We make our shifted alphabets
    shifted_alphabets = tuple(map(shift, alphabets))
    # Make them strings for maketrans
    joined_aphabets = ''.join(alphabets)
    joined_shifted_alphabets = ''.join(shifted_alphabets)
    # We must have 2 strings of equal length to "map" our unshifted and shifted alphabets
    table = str.maketrans(joined_aphabets, joined_shifted_alphabets)
    # Return the translated string
    return string.translate(table)

