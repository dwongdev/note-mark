package storage

import (
	"testing"

	"github.com/enchant97/note-mark/backend/core"
)

func TestCreateSecureNodePath(t *testing.T) {
	rootPath := "/secure/data"
	username := core.Username("leo")
	tests := []struct {
		slug     string
		expect   string
		hasError bool
	}{
		{"my-notes", "/secure/data/leo/my-notes", false},
		{"my-notes/testing", "/secure/data/leo/my-notes/testing", false},
		{"general/../my-notes", "/secure/data/leo/my-notes", false},
		{"../../my-notes", "", true},
		{"../my-notes", "", true},
		{"../leoevil/file", "", true},
		{"", "", true},
		{".", "", true},
	}
	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			actual, err := createSecureNodePath(rootPath, username, tt.slug)
			if tt.hasError && err == nil {
				t.Errorf("actual '%v' expect err", actual)
			} else if !tt.hasError && err != nil {
				t.Errorf("actual '%v' expect no err", err)
			} else if !tt.hasError && err == nil && tt.expect != actual {
				t.Errorf("actual '%v' expect '%v'", actual, tt.expect)
			}
		})
	}
}

func TestCreateSecureUserPath(t *testing.T) {
	rootPath := "/secure/data"
	tests := []struct {
		username string
		expect   string
		hasError bool
	}{
		{"leo", "/secure/data/leo", false},
		{"Leo", "/secure/data/Leo", false},
		{"Leo123", "/secure/data/Leo123", false},
		{"", "", true},
		{"..", "", true},
		{"/", "", true},
		{"\\", "", true},
	}
	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			actual, err := createSecureUserPath(rootPath, core.Username(tt.username))
			if tt.hasError && err == nil {
				t.Errorf("actual '%v' expect err", actual)
			} else if !tt.hasError && err != nil {
				t.Errorf("actual '%v' expect no err", err)
			} else if !tt.hasError && err == nil && tt.expect != actual {
				t.Errorf("actual '%v' expect '%v'", actual, tt.expect)
			}
		})
	}
}
