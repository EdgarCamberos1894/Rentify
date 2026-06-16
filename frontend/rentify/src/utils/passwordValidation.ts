export const passwordRequirementsText =
  "Minimo 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial.";

export const passwordPattern =
  /^(?=.*[A-Z\u00D1])(?=.*[a-z\u00F1])(?=.*\d)(?=.*[-@#$%^&*.,()_+{}|;:'"<>/!\u00A1\u00BF?])[A-Z\u00D1a-z\u00F1\d-@#$%^&*.,()_+{}|;:'"<>/!\u00A1\u00BF?]{8,}$/;

export const passwordRules = {
  pattern: {
    value: passwordPattern,
    message: passwordRequirementsText,
  },
};
