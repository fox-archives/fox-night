package cmd

import (
	"github.com/hyperupcall/fox-night/backend/server"
	"github.com/spf13/cobra"
)

// serverCmd represents the serve command
var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "Serve the website",
	Run: func(cmd *cobra.Command, args []string) {
		server.Start()
	},
}

func init() {
	rootCmd.AddCommand(serverCmd)
}
