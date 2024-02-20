{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv/v0.6.3";
  };

  outputs = { self, nixpkgs, devenv, systems, ... }@inputs:
    let forEachSystem = nixpkgs.lib.genAttrs (import systems);
    in {
      devShells = forEachSystem (system:
        let pkgs = nixpkgs.legacyPackages.${system};
        in {
          default = devenv.lib.mkShell {
            inherit inputs pkgs;
            modules = [{

              languages = {
                javascript = {
                  enable = true;
                };
              };

              packages = with pkgs; [
                mariadb
              ];
              # https://devenv.sh/reference/options/
              services.mysql = {
                enable = true;
                package = pkgs.mariadb;
                initialDatabases = [{ name = "my-server-db"; }];
                ensureUsers = [
                  {
                    name = "root";
                    password = "";
                    ensurePermissions = { "root.*" = "ALL PRIVILEGES"; };
                  }
                ];
                settings = {
                  # mysql = {
                  #   user = "username";
                  #   password = "test";
                  # };
                  mysqld = {
                    # "sql_require_primary_key" = "on";
                    "bind_address" = "localhost";
                  };
                };
              };
            }];
          };
        });
    };
}
