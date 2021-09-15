export default class Candidate {
  candidate;
  sdpMLineIndex;
  sdpMid;
  datetime;
  constructor(candidate, sdpMLineIndex, sdpMid, datetime) {
    this.candidate = candidate;
    this.sdpMLineIndex = sdpMLineIndex;
    this.sdpMid = sdpMid;
    this.datetime = datetime;
  }
}