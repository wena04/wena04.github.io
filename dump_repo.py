import os

# --- CONFIGURATION ---
# Extensions to include (add more if needed)
EXTENSIONS = {'.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json'}

# Folders/Files to ALWAYS ignore
IGNORE_DIRS = {'node_modules', '.git', 'dist', 'build', '.vscode'}
IGNORE_FILES = {'package-lock.json', 'yarn.lock', 'dump_repo.py'}

def dump_codebase():
    output_filename = "full_codebase.txt"
    
    with open(output_filename, "w", encoding="utf-8") as outfile:
        # Walk through all directories starting from current folder
        for root, dirs, files in os.walk("."):
            
            # Filter out ignored directories in-place
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
            
            for file in files:
                if file in IGNORE_FILES:
                    continue
                    
                # Check extension
                _, ext = os.path.splitext(file)
                if ext.lower() in EXTENSIONS:
                    file_path = os.path.join(root, file)
                    
                    # Write file header
                    outfile.write(f"\n{'='*50}\n")
                    outfile.write(f"FILE: {file_path}\n")
                    outfile.write(f"{'='*50}\n\n")
                    
                    # Write file content
                    try:
                        with open(file_path, "r", encoding="utf-8") as infile:
                            outfile.write(infile.read())
                    except Exception as e:
                        outfile.write(f"Error reading file: {e}")
                    
                    outfile.write("\n\n")

    print(f"✅ Success! All code saved to: {output_filename}")

if __name__ == "__main__":
    dump_codebase()