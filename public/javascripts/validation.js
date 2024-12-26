function validateURL(url) {
    let regex = /^(https?|ftp):\/\/([a-zA-Z0-9\-\.]+)(:[0-9]+)?(\/[a-zA-Z0-9\-\.\/?&%=#]*)?$/;
    return regex.test(url);
}