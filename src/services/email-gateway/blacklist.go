package main

// TODO: add some blacklist source
func checkEmailIsBlocked(email string, env environment) (bool, error) {
	if email == "theblockedone@gmail.com" {
		return true, nil
	}

	return false, nil
}
