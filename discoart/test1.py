#@title Init
import os
from google.colab import drive
drive.mount('/content/drive')
path = "/content/drive/MyDrive/AI/discoart/"
if not os.path.exists(path):
  os.mkdir(path)
os.chdir(path)
print("Current Directory: %s" % os.getcwd())
!nvidia-smi
!pip install -U discoart