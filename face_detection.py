import numpy as np
import cv2
import time
import glob
import argparse
import os
import Update_Model
import eel
import light

frequency = 2500
duration = 1000
eel.init('music_design')
font = cv2.FONT_ITALIC
# default web cam
video_capture = cv2.VideoCapture(0)
# load the trained model
facecascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
fishface=cv2.face.FisherFaceRecognizer_create()
'''try:
    fishface.read('trained_emoclassifier.xml')
except:
    print("no xml found.--update will create one")'''

# create object for argparse
parser=argparse.ArgumentParser(description="Options for emotion-based music player")
parser.add_argument("--update", help=" Call to grab images and update model accordingly" , action = "store_true")
args=parser.parse_args()
facedict={}
emotions=["angry","happy","sad","neutral"]

def crop_face(clahe_image,face):
    for(x,y,w,h) in face:
        faceslice=clahe_image[y:y+h,x:x+w]
        faceslice=cv2.resize(faceslice,(350,350))
    # append sliced face as a numbered face to dictionary
    facedict["face%s"%(len(facedict)+1)]=faceslice
    return faceslice

def update_model(emotions):
    print("Update model mode activated")
    check_folders(emotions)
    for i in range(0,len(emotions)):
        save_face(emotions[i])
    print("Updating model")
    Update_Model.update(emotions)
    print("Done!")

# Create folders if not present
def check_folders(emotions):
    for x in emotions:
        if os.path.exists("dataset\\%s" %x):
            pass
        else:
            os.makedirs("dataset\\%s" %x)

def save_face(emotion):
    print("\n Please look "+emotion+" when the timer expires, keep the emotion stable until then")
    for i in range(0,5):# timer
        print(5-i)
        time.sleep(1)
    while len(facedict.keys())<16:
        detect_face()
    for x in facedict.keys():
        cv2.imwrite("dataset\\%s\\%s.jpg" %(emotion, len(glob.glob("dataset\\%s\\*" %emotion))), facedict[x])
    # clear the dictionary to save next emotion
    facedict.clear()

def recognize_emotion():
    predictions=[]
    confidence=[]
    for x in facedict.keys():
        pred, conf=fishface.predict(facedict[x]) # returns label and associated confidence
        cv2.imwrite("images\\%s.jpg" %x,facedict[x])
        predictions.append(pred)
        confidence.append(conf)
    output= emotions[max(set(predictions),key=predictions.count)]
    print("You seem to be %s"%output)
    return output
    facedict.clear()




def grab_face():
   # ret,frame=video_capture.read() # Grab the frame. Ret is true if the face was successfully grabbed.
    ret,frame=light.noLight()

    grey = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    clahe=cv2.createCLAHE(clipLimit=2.0,tileGridSize=(8,8)) # create clahe object
    clahe_image=clahe.apply(grey)
    return clahe_image


def detect_face():
    clahe_image=grab_face()
    face=facecascade.detectMultiScale(clahe_image,scaleFactor=1.1,minNeighbors=20,minSize=(10,10))
    #detect if one face is detected or not
    if len(face)==1:
        faceslice=crop_face(clahe_image,face)
        return faceslice
    else:
        print("No/Multiple faces are detected")

count=0
@eel.expose
def get_emotion():
    while True:
        count=0
        detect_face()
        count=count+1
        # if update flag is present call update function
        if args.update:
            update_model(emotions)
            break
        elif len(facedict)==10:
            fishface.read('model2.xml')
            return recognize_emotion()
            break

eel.start('main.html')


