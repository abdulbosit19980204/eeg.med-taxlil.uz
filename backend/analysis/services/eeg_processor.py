import mne
import numpy as np
from pathlib import Path

class EEGProcessor:
    """
    Handles medical-grade EEG signal processing.
    """
    def __init__(self, file_path: str):
        self.file_path = Path(file_path)
        if not self.file_path.exists():
            raise FileNotFoundError(f"EEG file not found: {file_path}")

    def get_info(self):
        """
        Extract basic metadata from EDF/BDF.
        """
        try:
            raw = mne.io.read_raw_edf(str(self.file_path), preload=False, verbose=False)
            return {
                "channels": raw.ch_names,
                "sfreq": raw.info['sfreq'],
                "duration": raw.times[-1],
                "n_channels": len(raw.ch_names)
            }
        except Exception as e:
            return {"error": str(e)}

    def get_signal_data(self, start_time: float = 0, duration: float = 10, channels: list = None):
        """
        Extract raw signal data for specific window.
        """
        try:
            raw = mne.io.read_raw_edf(str(self.file_path), preload=True, verbose=False)
            if channels:
                raw.pick_channels(channels)
            
            # Simple downsampling for visualization if needed
            # For brevity, returning a slice of data
            start_idx = int(start_time * raw.info['sfreq'])
            end_idx = int((start_time + duration) * raw.info['sfreq'])
            
            data, times = raw[:, start_idx:end_idx]
            
            # Convert to list for JSON response
            return {
                "times": times.tolist(),
                "data": data.tolist(),
                "channels": raw.ch_names
            }
        except Exception as e:
            return {"error": str(e)}
