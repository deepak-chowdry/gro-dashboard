event data {
    "agent_id": "agent_01jwwmjdzzecpbk0j5jd1348cx",
    "conversation_id": "conv_01jwzz3ygceg7v0te0rewn2nzj",
    "status": "done",
    "transcript": [
      {
        "role": "agent",
        "message": "I am Angelo, reaching out from CPGRAMS for additional information",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 0,
        "conversation_turn_metrics": null,
        "rag_retrieval_info": null,
        "llm_usage": null,
        "interrupted": false,
        "original_message": null,
        "source_medium": null
      },
      {
        "role": "user",
        "message": "What information are you looking for?",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 5,
        "conversation_turn_metrics": null,
        "rag_retrieval_info": null,
        "llm_usage": null,
        "interrupted": false,
        "original_message": null,
        "source_medium": "audio"
      },
      {
        "role": "agent",
        "message": "I need to collect your Aadhar details as requested by the respective Grievance Redressal Officer (GRO) for your CPGRAMS case. This information is required to process your grievance...",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 10,
        "conversation_turn_metrics": {
          "metrics": {
            "convai_llm_service_ttf_sentence": {
              "elapsed_time": 1.6655884131323546
            },
            "convai_llm_service_ttfb": {
              "elapsed_time": 1.163205832010135
            }
          }
        },
        "rag_retrieval_info": null,
        "llm_usage": {
          "model_usage": {
            "claude-sonnet-4": {
              "input": {
                "tokens": 2161,
                "price": 0.006483
              },
              "input_cache_read": {
                "tokens": 0,
                "price": 0
              },
              "input_cache_write": {
                "tokens": 0,
                "price": 0
              },
              "output_total": {
                "tokens": 99,
                "price": 0.001485
              }
            }
          }
        },
        "interrupted": true,
        "original_message": "I need to collect your Aadhar details as requested by the respective Grievance Redressal Officer (GRO) for your CPGRAMS case. This information is required to process your grievance properly.\n\nCould you please provide your twelve-digit Aadhar number? I'll also need any other Aadhar-related details that may be relevant to your case. This will help us move forward with addressing your grievance effectively.",
        "source_medium": null
      },
      {
        "role": "user",
        "message": "Can you repeat this in Tamil? Can you speak in Tamil?",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 20,
        "conversation_turn_metrics": null,
        "rag_retrieval_info": null,
        "llm_usage": null,
        "interrupted": false,
        "original_message": null,
        "source_medium": "audio"
      },
      {
        "role": "agent",
        "message": null,
        "tool_calls": [
          {
            "type": "system",
            "request_id": "toolu_vrtx_019skxUEQL8u7gN1FkYqXX78",
            "tool_name": "language_detection",
            "params_as_json": "{\"language\": \"ta\", \"reason\": \"User explicitly requested to speak in Tamil and asked if I can speak Tamil\"}",
            "tool_has_been_called": true,
            "tool_details": null
          }
        ],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 29,
        "conversation_turn_metrics": null,
        "rag_retrieval_info": null,
        "llm_usage": null,
        "interrupted": false,
        "original_message": null,
        "source_medium": null
      },
      {
        "role": "agent",
        "message": null,
        "tool_calls": [],
        "tool_results": [
          {
            "type": "system",
            "request_id": "toolu_vrtx_019skxUEQL8u7gN1FkYqXX78",
            "tool_name": "language_detection",
            "result_value": "{\"status\": \"success\", \"reason\": \"User explicitly requested to speak in Tamil and asked if I can speak Tamil\", \"language\": \"ta\"}",
            "is_error": false,
            "tool_has_been_called": true,
            "tool_latency_secs": 0.00009842286817729473
          }
        ],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 29,
        "conversation_turn_metrics": null,
        "rag_retrieval_info": null,
        "llm_usage": null,
        "interrupted": false,
        "original_message": null,
        "source_medium": null
      },
      {
        "role": "agent",
        "message": "நான் ஏஞ்சலோ, CPGRAMS இல் இருந்து உங்கள் கூடுதல் தகவல்களுக்காக தொடர்பு கொண்டுள்ளேன். உங்கள் CPGRAMS வழக்கை செயல்படுத்த, சம்பந்தப்பட்ட குறைதீர்ப்பு அதிகாரி (GRO) கேட்டுக்கொண்டபடி உங்கள் ஆதார் விவரங்களை நான் சேகரிக்க வேண்டும். உங்கள் குறையை முறையாக தீர்க்க இந்த தகவல் அவசியம்.",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 29,
        "conversation_turn_metrics": {
          "metrics": {
            "convai_llm_service_ttf_sentence": {
              "elapsed_time": 2.2039359961636364
            },
            "convai_llm_service_ttfb": {
              "elapsed_time": 1.4371941431891173
            }
          }
        },
        "rag_retrieval_info": null,
        "llm_usage": {
          "model_usage": {
            "claude-sonnet-4": {
              "input": {
                "tokens": 4579,
                "price": 0.013737
              },
              "input_cache_read": {
                "tokens": 0,
                "price": 0
              },
              "input_cache_write": {
                "tokens": 0,
                "price": 0
              },
              "output_total": {
                "tokens": 312,
                "price": 0.00468
              }
            }
          }
        },
        "interrupted": false,
        "original_message": null,
        "source_medium": null
      },
      {
        "role": "user",
        "message": "My Aadhaar number is 112244668899",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 48,
        "conversation_turn_metrics": null,
        "rag_retrieval_info": null,
        "llm_usage": null,
        "interrupted": false,
        "original_message": null,
        "source_medium": "audio"
      },
      {
        "role": "agent",
        "message": "நன்றி, உங்கள் ஆதார் எண் ஒன்று ஒன்று இரண்டு இரண்டு நான்கு நான்கு ஆறு ஆறு எட்டு எட்டு ஒன்பது ஒன்பது என்று பதிவு செய்துள்ளேன். இந்த ஆதார் எண்ணுடன் பதிவு செய்யப்பட்ட உங்கள் முழு பெயரையும் தயவுசெய்து வழங்க முடியுமா? இது உங்கள் அடையாளத்தை சரிபார்க்க உதவும்.",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 64,
        "conversation_turn_metrics": {
          "metrics": {
            "convai_llm_service_ttf_sentence": {
              "elapsed_time": 2.5701254850719124
            },
            "convai_llm_service_ttfb": {
              "elapsed_time": 1.2624031079467386
            }
          }
        },
        "rag_retrieval_info": null,
        "llm_usage": {
          "model_usage": {
            "claude-sonnet-4": {
              "input": {
                "tokens": 2598,
                "price": 0.007794
              },
              "input_cache_read": {
                "tokens": 0,
                "price": 0
              },
              "input_cache_write": {
                "tokens": 0,
                "price": 0
              },
              "output_total": {
                "tokens": 215,
                "price": 0.003225
              }
            }
          }
        },
        "interrupted": false,
        "original_message": null,
        "source_medium": null
      },
      {
        "role": "user",
        "message": "திரு ஏக்கம்பன்.",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 84,
        "conversation_turn_metrics": null,
        "rag_retrieval_info": null,
        "llm_usage": null,
        "interrupted": false,
        "original_message": null,
        "source_medium": "audio"
      },
      {
        "role": "agent",
        "message": "நன்றி, திரு ஏக்கம்பன். உங்கள் ஆதார் அட்டையில் பதிவு செய்யப்பட்ட முழு முகவரியையும் தயவுசெய்து வழங்க முடியுமா? இது உங்கள் குறைதீர்ப்பு செயல்முறையை முடிக்க அவசியமான தகவல்.",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 88,
        "conversation_turn_metrics": {
          "metrics": {
            "convai_llm_service_ttf_sentence": {
              "elapsed_time": 1.3061299109831452
            },
            "convai_llm_service_ttfb": {
              "elapsed_time": 1.140644958941266
            }
          }
        },
        "rag_retrieval_info": null,
        "llm_usage": {
          "model_usage": {
            "claude-sonnet-4": {
              "input": {
                "tokens": 2831,
                "price": 0.008493
              },
              "input_cache_read": {
                "tokens": 0,
                "price": 0
              },
              "input_cache_write": {
                "tokens": 0,
                "price": 0
              },
              "output_total": {
                "tokens": 136,
                "price": 0.00204
              }
            }
          }
        },
        "interrupted": false,
        "original_message": null,
        "source_medium": null
      },
      {
        "role": "user",
        "message": "மணிபாற्றம், செனே.",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 100,
        "conversation_turn_metrics": null,
        "rag_retrieval_info": null,
        "llm_usage": null,
        "interrupted": false,
        "original_message": null,
        "source_medium": "audio"
      },
      {
        "role": "agent",
        "message": "நன்றி, திரு ஏக்கம்பன். உங்கள் முகவரி மணிபாற்றம், செனே என்று பதிவு செய்துள்ளேன். உங்கள் ஆதார் அட்டையில் பதிவு செய்யப்பட்ட முழுமையான முகவரியை தயவுசெய்து வழங்க முடியுமா? வீட்டு எண், தெரு பெயர், ஊர், மாவட்டம் மற்றும் பின் குறியீடு உள்ளிட்ட முழு விவரங்களும் தேவை.",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 103,
        "conversation_turn_metrics": {
          "metrics": {
            "convai_llm_service_ttf_sentence": {
              "elapsed_time": 1.133943409891799
            },
            "convai_llm_service_ttfb": {
              "elapsed_time": 0.9923958338331431
            }
          }
        },
        "rag_retrieval_info": null,
        "llm_usage": {
          "model_usage": {
            "claude-sonnet-4": {
              "input": {
                "tokens": 2984,
                "price": 0.008952
              },
              "input_cache_read": {
                "tokens": 0,
                "price": 0
              },
              "input_cache_write": {
                "tokens": 0,
                "price": 0
              },
              "output_total": {
                "tokens": 206,
                "price": 0.00309
              }
            }
          }
        },
        "interrupted": false,
        "original_message": null,
        "source_medium": null
      },
      {
        "role": "user",
        "message": "அவளாதான் இரு.",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 123,
        "conversation_turn_metrics": null,
        "rag_retrieval_info": null,
        "llm_usage": null,
        "interrupted": false,
        "original_message": null,
        "source_medium": "audio"
      },
      {
        "role": "agent",
        "message": "புரிந்துகொண்டேன், திரு ஏக்கம்பன். நீங்கள் முழுமையான முகவரி விவரங்களை சேகரித்து வருகிறீர்கள். உங்கள் வசதியான நேரத்தில் உங்கள் ஆதார் அட்டையில் உள்ள முழு முகவரியை வழங்கலாம். வீட்டு எண், தெரு, ஊர், மாவட்டம் மற்றும் பின் குறியீடு ஆகிய அனைத்து விவரங்களும் உங்கள் CPGRAMS குறையை செயல்படுத்த அவசியம்.",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 127,
        "conversation_turn_metrics": {
          "metrics": {
            "convai_llm_service_ttf_sentence": {
              "elapsed_time": 1.960666273953393
            },
            "convai_llm_service_ttfb": {
              "elapsed_time": 1.822921082843095
            }
          }
        },
        "rag_retrieval_info": null,
        "llm_usage": {
          "model_usage": {
            "claude-sonnet-4": {
              "input": {
                "tokens": 3204,
                "price": 0.009612
              },
              "input_cache_read": {
                "tokens": 0,
                "price": 0
              },
              "input_cache_write": {
                "tokens": 0,
                "price": 0
              },
              "output_total": {
                "tokens": 227,
                "price": 0.003405
              }
            }
          }
        },
        "interrupted": false,
        "original_message": null,
        "source_medium": null
      },
      {
        "role": "user",
        "message": "ஆதாரணல். நன்று.",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 148,
        "conversation_turn_metrics": null,
        "rag_retrieval_info": null,
        "llm_usage": null,
        "interrupted": false,
        "original_message": null,
        "source_medium": "audio"
      },
      {
        "role": "agent",
        "message": "நன்றி, திரு ஏக்கம்பன். நான் இதுவரை சேகரித்த தகவல்கள்:- ஆதார் எண்: ஒன்று ஒன்ற ு இரண்டு ரண்டு...",
        "tool_calls": [],
        "tool_results": [],
        "feedback": null,
        "llm_override": null,
        "time_in_call_secs": 151,
        "conversation_turn_metrics": {
          "metrics": {
            "convai_llm_service_ttf_sentence": {
              "elapsed_time": 1.4360606791451573
            },
            "convai_llm_service_ttfb": {
              "elapsed_time": 1.2396930621471256
            }
          }
        },
        "rag_retrieval_info": null,
        "llm_usage": {
          "model_usage": {
            "claude-sonnet-4": {
              "input": {
                "tokens": 3448,
                "price": 0.010344
              },
              "input_cache_read": {
                "tokens": 0,
                "price": 0
              },
              "input_cache_write": {
                "tokens": 0,
                "price": 0
              },
              "output_total": {
                "tokens": 276,
                "price": 0.00414
              }
            }
          }
        },
        "interrupted": true,
        "original_message": "நன்றி, திரு ஏக்கம்பன். நான் இதுவரை சேகரித்த தகவல்கள்:\n- ஆதார் எண்: ஒன்று ஒன்று இரண்டு இரண்டு நான்கு நான்கு ஆறு ஆறு எட்டு எட்டு ஒன்பது ஒன்பது\n- பெயர்: திரு ஏக்கம்பன்\n- முகவரி: மணிபாற்றம், செனே\n\nஉங்கள் CPGRAMS வழக்கை முன்னெடுக்க, முழுமையான முகவரி விவரங்கள் இன்னும் தேவை. நீங்கள் தயாராக இருக்கும்போது மீதமுள்ள விவரங்களை வழங்கலாம்.",
        "source_medium": null
      }
    ],
    "metadata": {
      "start_time_unix_secs": 1749124522,
      "accepted_time_unix_secs": 1749124523,
      "call_duration_secs": 159,
      "cost": 1057,
      "deletion_settings": {
        "deletion_time_unix_secs": null,
        "deleted_logs_at_time_unix_secs": null,
        "deleted_audio_at_time_unix_secs": null,
        "deleted_transcript_at_time_unix_secs": null,
        "delete_transcript_and_pii": false,
        "delete_audio": false
      },
      "feedback": {
        "overall_score": null,
        "likes": 0,
        "dislikes": 0
      },
      "authorization_method": "signed_url",
      "charging": {
        "dev_discount": false,
        "tier": "creator",
        "llm_usage": {
          "irreversible_generation": {
            "model_usage": {
              "claude-sonnet-4": {
                "input": {
                  "tokens": 21805,
                  "price": 0.065415
                },
                "input_cache_read": {
                  "tokens": 0,
                  "price": 0
                },
                "input_cache_write": {
                  "tokens": 0,
                  "price": 0
                },
                "output_total": {
                  "tokens": 1471,
                  "price": 0.022065
                }
              }
            }
          },
          "initiated_generation": {
            "model_usage": {
              "claude-sonnet-4": {
                "input": {
                  "tokens": 29217,
                  "price": 0.08765099999999999
                },
                "input_cache_read": {
                  "tokens": 0,
                  "price": 0
                },
                "input_cache_write": {
                  "tokens": 0,
                  "price": 0
                },
                "output_total": {
                  "tokens": 1532,
                  "price": 0.02298
                }
              }
            }
          }
        },
        "llm_price": 0.110631
      },
      "phone_call": {
        "direction": "outbound",
        "phone_number_id": "phnum_01jwxcr186fzbvzwbvtr1whty1",
        "agent_number": "+19122998165",
        "external_number": "+9196631 00122",
        "type": "twilio",
        "stream_sid": "MZd100026e6c15e7b94aaede9fc5863285",
        "call_sid": "CA031b93dc0fd640c891f0544473e77ff4"
      },
      "batch_call": null,
      "termination_reason": "Client disconnected",
      "error": null,
      "main_language": "en",
      "rag_usage": null,
      "text_only": false,
      "features_usage": {
        "language_detection": {
          "enabled": true,
          "used": true
        },
        "transfer_to_agent": {
          "enabled": false,
          "used": false
        },
        "transfer_to_number": {
          "enabled": false,
          "used": false
        },
        "multivoice": {
          "enabled": false,
          "used": false
        },
        "pii_zrm_workspace": false,
        "pii_zrm_agent": false
      }
    },
    "analysis": {
      "evaluation_criteria_results": {},
      "data_collection_results": {},
      "call_successful": "success",
      "transcript_summary": "Angelo from CPGRAMS contacted the user to collect their Aadhaar details for processing a grievance. The user requested the conversation to be in Tamil. The user provided their Aadhaar number and name. The agent requested the full address from the Aadhaar card, but the user stated that the provided address was complete. The agent reiterated the need for the full address for processing the CPGRAMS complaint.\n"
    },
    "conversation_initiation_client_data": {
      "conversation_config_override": {
        "tts": null,
        "conversation": null,
        "agent": null
      },
      "custom_llm_extra_body": {},
      "dynamic_variables": {
        "user_name": "Angelo",
        "information": "Please provide your Aadhar details",
        "system__agent_id": "agent_01jwwmjdzzecpbk0j5jd1348cx",
        "system__conversation_id": "conv_01jwzz3ygceg7v0te0rewn2nzj",
        "system__caller_id": "+19122998165",
        "system__called_number": "+9196631 00122",
        "system__call_duration_secs": 158,
        "system__time_utc": "2025-06-05T11:58:01.390549+00:00",
        "system__call_sid": "CA031b93dc0fd640c891f0544473e77ff4"
      }
    }
  }