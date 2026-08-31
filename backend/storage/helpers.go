package storage

import (
	"errors"
	"fmt"
	"path/filepath"
	"strings"

	"github.com/enchant97/note-mark/backend/core"
)

// Creates a secure absolute node path.
//
// This will ensure a slug cannot cause a path escape outside of root/user.
func createSecureNodePath(
	rootPath string,
	username core.Username,
	slug string,
) (string, error) {
	if !filepath.IsAbs(rootPath) {
		return "", fmt.Errorf("rootPath not abs '%s'", rootPath)
	}
	slug = filepath.FromSlash(slug)
	if slug == "" || slug == "." {
		return "", errors.Join(fmt.Errorf("slug must not be empty"), core.ErrSlugInvalid)
	}
	if !core.IsValidUsername(string(username)) {
		return "", fmt.Errorf("username is invalid")
	}
	userAbsPath := filepath.Join(rootPath, string(username))
	nodeAbsPath := filepath.Join(rootPath, string(username), slug)
	safePrefix := userAbsPath + string(filepath.Separator)
	if !strings.HasPrefix(nodeAbsPath, safePrefix) {
		return "", errors.Join(fmt.Errorf("slug would escape: '%s'", nodeAbsPath), core.ErrSlugInvalid)
	}
	return nodeAbsPath, nil
}


// Creates a secure absolute user path.
//
// This will ensure a username cannot cause a path escape outside of root/user.
func createSecureUserPath(rootPath string, username core.Username) (string, error) {
	if !filepath.IsAbs(rootPath) {
		return "", fmt.Errorf("rootPath not abs '%s'", rootPath)
	}
	if !core.IsValidUsername(string(username)) {
		return "", fmt.Errorf("username is invalid")
	}
	userAbsPath := filepath.Join(rootPath, string(username))
	return userAbsPath, nil
}
