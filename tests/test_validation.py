import subprocess, sys, unittest
from pathlib import Path
class RegistryTests(unittest.TestCase):
    def test_registry_validation(self):
        root=Path(__file__).resolve().parents[1]
        result=subprocess.run([sys.executable,str(root/'scripts/validate.py')],capture_output=True,text=True)
        self.assertEqual(result.returncode,0,result.stdout+result.stderr)
    def test_website_entrypoint(self):
        root=Path(__file__).resolve().parents[1]
        self.assertTrue((root/'website/index.html').exists())
        self.assertTrue((root/'website/js/app.js').exists())
if __name__=='__main__': unittest.main()
