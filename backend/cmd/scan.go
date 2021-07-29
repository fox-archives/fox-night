package cmd

import (
	"github.com/hyperupcall/fox-night/backend/scan"
	"github.com/spf13/cobra"
)

// scanCmd represents the scan command
var scanCmd = &cobra.Command{
	Use:   "scan",
	Short: "Scan, update, and prune the database of local movies",
	Long:  `For every directory specified in the 'scanDirs' key, movie files are recursively checked`,
	Run: func(cmd *cobra.Command, args []string) {
		scan.Start()
	},
}

func init() {
	rootCmd.AddCommand(scanCmd)

	scanCmd.Flags().BoolP("update", "u", false, "Update the SQLite database with new movies")
}
