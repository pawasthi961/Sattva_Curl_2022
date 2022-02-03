import os
import sys
from pathlib import Path

FILE = Path(__file__).resolve()
ROOT = FILE.parents[0]
if str(ROOT) not in sys.path:
    sys.path.append(str(ROOT))  
ROOT = Path(os.path.relpath(ROOT, Path.cwd()))

print(ROOT)

class Upload:
    def __init__(self,image_name,image_description):
        self.image_name = image_name
        self.image_description = image_description

    def main(self):
        print(ROOT)
        print("ok")
